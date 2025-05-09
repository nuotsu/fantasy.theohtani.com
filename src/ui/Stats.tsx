import { flatten, getPluralItems } from '@/lib/utils'
import { getScoreboard } from '@/lib/yf'
import { Fragment } from 'react'
import TeamLogo from './team/TeamLogo'

export default async function Stats({ league }: { league: YF.League }) {
	const scoreboard = await getScoreboard(league)

	const matchups = getPluralItems(scoreboard['0'].matchups)
	console.log(matchups)

	return (
		<div>
			<h2 className="font-bold">Week {scoreboard.week}</h2>

			<table className="text-center">
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
													<span className="absolute bottom-0 left-0 inline-block -translate-x-1/2 bg-red-500 px-1 py-0.5 text-[xx-small]/none text-white">
														VS
													</span>
												)}

												<TeamLogo team={team[0]} size={48} />
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
									({ team }: { team: [YF.TeamData, YF.TeamStats] }, key) => {
										return (
											<td className="relative">
												{key === 1 && (
													<span className="absolute left-0 -translate-x-1/2">
														-
													</span>
												)}

												<strong>{team[1].team_points.total}</strong>
											</td>
										)
									},
								)}
							</Fragment>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
