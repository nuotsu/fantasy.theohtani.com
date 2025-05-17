import { cn, flatten, getPluralItems } from '@/lib/utils'
import {
	getScoreboard,
	getStatCategories,
	getWeeklyStatWinners,
} from '@/lib/yf'
import { Fragment } from 'react'
import TeamLogo from './team/TeamLogo'

export default async function Stats({
	game,
	league,
}: {
	game: YF.GameInfo
	league: YF.League
}) {
	const scoreboard = await getScoreboard(league)

	const matchups = getPluralItems(scoreboard['0'].matchups) as {
		matchup: YF.Matchup
	}[]

	const stat_ids = matchups[0].matchup[
		'0'
	].teams[0].team[1].team_stats.stats.map((stat) => stat.stat.stat_id)

	const stat_categories = await getStatCategories(game)

	const weekly_stat_winners = await getWeeklyStatWinners(matchups, stat_ids)

	return (
		<article className="overflow-x-auto pb-2">
			<table className="w-full text-center whitespace-nowrap [&_:is(th,td)]:px-2 [&_td]:min-w-[6ch]">
				<thead>
					<tr>
						<th rowSpan={2}>Week {scoreboard.week}</th>

						{matchups.map((matchup: { matchup: YF.Matchup }, i) => (
							<Fragment key={i}>
								{getPluralItems(matchup.matchup['0'].teams).map(
									({ team }: { team: [YF.TeamInfo, YF.TeamStats] }, ii) => {
										const t = flatten<YF.TeamInfo>(team[0])

										return (
											<th
												className={cn({
													'border-l': ii === 0 && i > 0,
													relative: ii === 1,
												})}
												data-team-key={t.team_key}
												key={t.team_key}
											>
												{ii === 1 && (
													<span className="absolute top-1/2 left-0 inline-block -translate-1/2 bg-red-500 px-1 py-0.5 text-[xx-small]/none text-white">
														VS
													</span>
												)}

												<TeamLogo
													className="mx-auto size-8 max-w-[initial]"
													team={team[0]}
												/>
											</th>
										)
									},
								)}
							</Fragment>
						))}
					</tr>
					<tr>
						{matchups.map((matchup: { matchup: YF.Matchup }, i) => (
							<Fragment key={i}>
								{getPluralItems(matchup.matchup['0'].teams).map(
									({ team }: { team: [YF.TeamInfo, YF.TeamStats] }, ii) => (
										<td
											className={cn('relative', {
												'border-l': ii === 0 && i > 0,
											})}
											key={ii}
										>
											{ii === 1 && (
												<span className="absolute left-0 -translate-x-1/2">
													-
												</span>
											)}

											<strong>{team[1].team_points.total}</strong>
										</td>
									),
								)}
							</Fragment>
						))}
					</tr>
				</thead>

				<tbody>
					{stat_ids.map((stat_id) => {
						const stat = stat_categories
							.map((c) => c.stat)
							.find((category) => category.stat_id === Number(stat_id))

						return (
							<tr className="tabular-nums" key={stat_id}>
								<th
									className="sticky left-0 z-1 backdrop-blur-xs"
									data-stat-id={stat_id}
								>
									{stat?.display_name}
								</th>

								{matchups.map((matchup: { matchup: YF.Matchup }, i) => {
									const { winner_team_key } =
										matchup.matchup.stat_winners.find(
											({ stat_winner }) => stat_winner.stat_id === stat_id,
										)?.stat_winner ?? {}

									return (
										<Fragment key={i}>
											{getPluralItems(matchup.matchup['0'].teams).map(
												(
													{ team }: { team: [YF.TeamInfo, YF.TeamStats] },
													ii,
												) => {
													const t = flatten<YF.TeamInfo>(team[0])
													const weekly_winners = weekly_stat_winners
														.find((winners) => winners.stat_id === stat_id)
														?.team_keys.includes(t.team_key)

													return (
														<td
															className={cn({
																'border-fg border-l': ii === 0 && i > 0,
																'border-fg border-t':
																	stat?.display_name === 'H/AB',
																'border-fg border-t [border-top-style:dashed]':
																	stat?.display_name === 'IP',
																'bg-green-400/15 font-bold dark:text-green-400':
																	winner_team_key === t.team_key,
																'bg-amber-400/15 dark:text-amber-400':
																	weekly_winners,
															})}
															key={ii}
														>
															{
																team[1].team_stats.stats.find(
																	(stat) => stat.stat.stat_id === stat_id,
																)?.stat.value
															}
														</td>
													)
												},
											)}
										</Fragment>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</article>
	)
}
