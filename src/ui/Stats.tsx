import { flatten, getPluralItems } from '@/lib/utils'
import { getScoreboard, getStatCategories } from '@/lib/yf'
import { Fragment } from 'react'
import TeamLogo from './team/TeamLogo'

export default async function Stats({
	game,
	league,
}: {
	game: YF.Game
	league: YF.League
}) {
	const scoreboard = await getScoreboard(league)

	const matchups = getPluralItems(scoreboard['0'].matchups) as {
		matchup: YF.Matchup
	}[]

	const stat_ids = matchups[0].matchup[
		'0'
	].teams[0].team[1].team_stats.stats.map((stat) => stat.stat.stat_id)

	const stat_categories = (await getStatCategories(game)).map((c) => c.stat)
	console.log(stat_categories)

	return (
		<div>
			<h2 className="font-bold">Week {scoreboard.week}</h2>

			<div className="overflow-x-auto">
				<table className="text-center whitespace-nowrap [&_td]:px-2">
					<thead>
						<tr>
							<th></th>

							{matchups.map((matchup: { matchup: YF.Matchup }, key) => (
								<Fragment key={key}>
									{getPluralItems(matchup.matchup['0'].teams).map(
										({ team }: { team: [YF.TeamData, YF.TeamStats] }, key) => {
											const t = flatten<YF.TeamData>(team[0])

											return (
												<th className="relative" key={t.team_key}>
													{key === 1 && (
														<span className="absolute top-1/2 left-0 inline-block -translate-1/2 bg-red-500 px-1 py-0.5 text-[xx-small]/none text-white">
															VS
														</span>
													)}

													<TeamLogo className="mx-auto size-8" team={team[0]} />
												</th>
											)
										},
									)}
								</Fragment>
							))}
						</tr>
					</thead>

					<tbody>
						<tr>
							<th></th>

							{matchups.map((matchup: { matchup: YF.Matchup }, key) => (
								<Fragment key={key}>
									{getPluralItems(matchup.matchup['0'].teams).map(
										({ team }: { team: [YF.TeamData, YF.TeamStats] }, key) => (
											<td className="relative" key={key}>
												{key === 1 && (
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

						{stat_ids.map((stat_id) => {
							const stat = stat_categories.find(
								(category) => category.stat_id === Number(stat_id),
							)

							return (
								<tr className="tabular-nums" key={stat_id}>
									<th className="sticky left-0 backdrop-blur-xs">
										{stat?.display_name}
									</th>

									{matchups.map((matchup: { matchup: YF.Matchup }, key) => (
										<Fragment key={key}>
											{getPluralItems(matchup.matchup['0'].teams).map(
												(
													{ team }: { team: [YF.TeamData, YF.TeamStats] },
													key,
												) => (
													<td key={key}>
														{
															team[1].team_stats.stats.find(
																(stat) => stat.stat.stat_id === stat_id,
															)?.stat.value
														}
													</td>
												),
											)}
										</Fragment>
									))}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
