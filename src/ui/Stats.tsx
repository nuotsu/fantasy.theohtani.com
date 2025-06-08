import {
	getScoreboard,
	getStatCategories,
	getWeeklyStatWinners,
} from '@/lib/yf'
import { cn, flatten, getPluralItems } from '@/lib/utils'
import { Fragment } from 'react'
import TeamLogo from './team/TeamLogo'
import WillRevalidate from './WillRevalidate'
import Roster from './roster/Roster'

export default async function Stats({
	game,
	league,
}: {
	game: YF.GameInfo
	league: YF.LeagueInfo
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
		<section className="group/stats isolate overflow-x-auto pb-2">
			<table className="min-w-full table-fixed text-center whitespace-nowrap [&_td]:min-w-[6ch] group-has-[#show-roster:checked]/stats:[&_td]:min-w-[16ch]">
				<thead className="[&_:is(th,td)]:px-2">
					<tr>
						<th rowSpan={2}>Week {scoreboard.week}</th>

						{matchups.map((matchup: { matchup: YF.Matchup }, i) => (
							<Fragment key={i}>
								{getPluralItems(matchup.matchup[0].teams).map(
									({ team }: { team: [YF.TeamInfo, YF.TeamStats] }, ii) => {
										const t = flatten<YF.TeamInfo>(team[0])

										return (
											<th
												className={cn('pt-[.5ch]', {
													'border-l': ii === 0 && i > 0,
													relative: ii === 1,
													'bg-fg/15': t.is_owned_by_current_login,
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
													className="inline-block size-8 max-w-[initial]"
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
								{getPluralItems(matchup.matchup[0].teams).map(
									({ team }: { team: [YF.TeamInfo, YF.TeamStats] }, ii) => {
										const t = flatten<YF.TeamInfo>(team[0])
										const total = team[1].team_points.total

										return (
											<td
												className={cn('relative', {
													'border-l': ii === 0 && i > 0,
													'bg-fg/15': t.is_owned_by_current_login,
												})}
												key={ii}
											>
												{ii === 1 && (
													<span className="absolute left-0 -translate-x-1/2">
														-
													</span>
												)}

												<big className="font-bold">
													<WillRevalidate value={total} />
												</big>
											</td>
										)
									},
								)}
							</Fragment>
						))}
					</tr>
				</thead>

				<tbody className="[&_:is(th,td)]:px-2">
					{stat_ids.map((stat_id) => {
						const stat = stat_categories
							.map((c) => c.stat)
							.find((category) => category.stat_id === Number(stat_id))

						return (
							<tr className="tabular-nums" key={stat_id}>
								<th className="glass sticky left-0 z-1" data-stat-id={stat_id}>
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
															<WillRevalidate
																value={
																	team[1].team_stats.stats.find(
																		(stat) => stat.stat.stat_id === stat_id,
																	)?.stat.value
																}
															/>
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

				<tfoot className="[&_td]:text-left">
					<tr>
						<th className="glass sticky left-0 z-1">
							<label className="p-ch flex items-center justify-center gap-2">
								<input id="show-roster" type="checkbox" />
								Roster
							</label>
						</th>

						{matchups.map((matchup: { matchup: YF.Matchup }, i) => (
							<Fragment key={i}>
								{getPluralItems(matchup.matchup[0].teams).map(({ team }) => {
									const t = flatten<YF.TeamInfo>(team[0])

									return (
										<td
											className="py-ch group-[&:not(:has(#show-roster:checked))]/stats:hidden"
											key={t.team_id}
										>
											<TeamLogo className="mx-auto" team={team[0]} />
										</td>
									)
								})}
							</Fragment>
						))}
					</tr>

					<tr className="anim-fade-to-b *:align-top group-[&:not(:has(#show-roster:checked))]/stats:hidden">
						<th></th>

						{matchups.map((matchup: { matchup: YF.Matchup }, i) => (
							<Fragment key={i}>
								{getPluralItems(matchup.matchup[0].teams).map(({ team }) => {
									const t = flatten<YF.TeamInfo>(team[0])

									return (
										<td
											className="border-x-[.5ch] border-transparent"
											key={t.team_id}
										>
											<Roster team_key={t.team_key} />
										</td>
									)
								})}
							</Fragment>
						))}
					</tr>
				</tfoot>
			</table>
		</section>
	)
}
