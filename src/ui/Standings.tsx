import { cn, flatten } from '@/lib/utils'
import { getStandings } from '@/lib/yf'
import TeamLogo from './team/TeamLogo'

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
				<table className="text-center whitespace-nowrap [&_td]:px-2">
					<thead>
						<tr>
							<th>Rank</th>
							<th colSpan={2}>Team</th>
							<th>Manager</th>
							<th>W-L-T</th>
							<th>Pct</th>
							<th>GB</th>
							<th>Moves</th>
						</tr>
					</thead>

					<tbody>
						{teams.map((team) => {
							const t = flatten<YF.TeamData>(team.team[0])
							const { wins, losses, ties } =
								team.team[2].team_standings.outcome_totals

							return (
								<tr
									className={cn(t.is_owned_by_current_login && 'font-bold')}
									key={t.team_key}
								>
									<td className="w-[2ch] text-center tabular-nums">
										{team.team[2].team_standings.rank}
									</td>

									<td className="sticky left-0 px-0! backdrop-blur-[2px]">
										<TeamLogo
											className="size-8 max-w-[initial]"
											team={team.team[0]}
										/>
									</td>

									<td className="text-left">{t.name} </td>

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
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
