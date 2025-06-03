import { cn, flatten } from '@/lib/utils'
import { getStandings } from '@/lib/yf'
import { FaYahoo } from 'react-icons/fa6'
import TeamLogo from './team/TeamLogo'
import Projections from './Projections'

export default async function Standings({ league }: { league: YF.LeagueInfo }) {
	const standings = await getStandings(league.league_key)
	const teams = Object.values(standings).filter((team: any) => isNaN(team))

	return (
		<section className="gap-ch grid" key={league.league_key}>
			<header className="gap-ch px-ch flex flex-wrap items-center justify-between text-center">
				<h2 className="gap-ch flex items-center font-bold">
					<img
						className="aspect-square size-8 shrink-0 object-cover"
						src={league.logo_url}
						alt={league.name}
					/>

					{league.name}
				</h2>

				<a className="action" href={league.url}>
					<FaYahoo />
					Open in Yahoo
				</a>
			</header>

			<div className="overflow-x-auto pb-2">
				<table className="w-full text-center whitespace-nowrap [&_:is(th,td)]:px-2">
					<thead>
						<tr className="[&_[rowspan]]:align-bottom">
							<th rowSpan={2}>Rank</th>
							<th rowSpan={2} colSpan={2}>
								Team
							</th>
							<th rowSpan={2}>Manager</th>
							<th rowSpan={2}>Moves</th>
							<th colSpan={3} className="border-l border-dashed">
								Current
							</th>
							<th colSpan={4} className="border-l border-dashed">
								Projections
							</th>
						</tr>
						<tr className="border-b font-bold">
							<th className="border-l border-dashed">W-L-T</th>
							<th>Pct</th>
							<th>GB</th>
							<th className="border-l border-dashed">W-L-T</th>
							<th>Pct</th>
							<th>GB</th>
							<th>Rank</th>
						</tr>
					</thead>

					<tbody>
						{teams.map((team) => {
							const t = flatten<YF.TeamInfo>(team.team[0])
							const { rank, outcome_totals, games_back } =
								team.team[2].team_standings
							const { wins, losses, ties, percentage } = outcome_totals

							return (
								<tr
									className={cn(t.is_owned_by_current_login && 'font-bold')}
									key={t.team_key}
								>
									<td className="w-[2ch] text-center">{rank}</td>

									<td className="glass sticky left-0 px-0!">
										<TeamLogo
											className="mx-auto size-8 max-w-[initial]"
											team={team.team[0]}
										/>
									</td>

									<td className="text-left">{t.name}</td>

									<td>
										{t.managers
											.map((manager: any) => manager.manager.nickname)
											.join(', ')}
									</td>

									<td className="tabular-nums">{t.number_of_moves}</td>

									<td className="border-l border-dashed tabular-nums">
										{wins}-{losses}-{ties}
									</td>

									<td
										className={cn('tabular-nums', {
											'text-green-500 dark:text-green-200':
												Number(percentage) > 0.5,
											'text-red-500 dark:text-red-200':
												Number(percentage) < 0.5,
										})}
									>
										{percentage}
									</td>

									<td className="tabular-nums">
										{games_back !== '-' ? Number(games_back).toFixed(1) : '-'}
									</td>

									<Projections league={league} team={team} />
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</section>
	)
}
