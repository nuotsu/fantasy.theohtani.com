import { cn, flatten } from '@/lib/utils'
import { getStandings } from '@/lib/yf'
import TeamLogo from './team/TeamLogo'
import Projections from './Projections'

export default async function Standings({ league }: { league: YF.League }) {
	const standings = await getStandings(league.league_key)
	const teams = Object.values(standings).filter((team: any) => isNaN(team))

	return (
		<div key={league.league_key}>
			<hgroup>
				<h3 className="font-bold">{league.name}</h3>
				<p className="technical text-xs">League</p>
			</hgroup>

			<div className="overflow-x-auto">
				<table className="text-center whitespace-nowrap [&_:is(th,td)]:px-2">
					<thead>
						<tr>
							<th rowSpan={2}>Rank</th>
							<th rowSpan={2} colSpan={2}>
								Team
							</th>
							<th rowSpan={2}>Manager</th>
							<th rowSpan={2}>W-L-T</th>
							<th rowSpan={2}>Pct</th>
							<th rowSpan={2}>GB</th>
							<th rowSpan={2}>Moves</th>
							<th colSpan={4} className="border-l border-dashed">
								Projections
							</th>
						</tr>
						<tr>
							<td className="border-l border-dashed">W-L-T</td>
							<td>Pct</td>
							<td>GB</td>
							<td>Rank</td>
						</tr>
					</thead>

					<tbody>
						{teams.map((team) => {
							const t = flatten<YF.TeamInfo>(team.team[0])
							const { wins, losses, ties } =
								team.team[2].team_standings.outcome_totals

							return (
								<tr
									className={cn(t.is_owned_by_current_login && 'font-bold')}
									key={t.team_key}
								>
									<td className="w-[2ch] text-center">
										{team.team[2].team_standings.rank}
									</td>

									<td className="sticky left-0 px-0! backdrop-blur-xs">
										<TeamLogo
											className="size-8 max-w-[initial]"
											team={team.team[0]}
										/>
									</td>

									<td className="text-left">{t.name}</td>

									<td>
										{t.managers
											.map((manager: any) => manager.manager.nickname)
											.join(', ')}
									</td>

									<td className="tabular-nums">
										{wins}-{losses}-{ties}
									</td>

									<td className="tabular-nums">
										{team.team[2].team_standings.outcome_totals.percentage}
									</td>

									<td className="tabular-nums">
										{team.team[2].team_standings.games_back}
									</td>

									<td className="tabular-nums">{t.number_of_moves}</td>

									<Projections league={league} team={team} />
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
