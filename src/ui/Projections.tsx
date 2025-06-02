import { cn, flatten, getPluralItems } from '@/lib/utils'
import { getScoreboard } from '@/lib/yf'
import DynamicProjections from './Projections.Dynamic'

export default async function Projections({
	league,
	team,
}: {
	league: YF.LeagueInfo
	team: { team: YF.Team }
}) {
	const t = flatten<YF.TeamInfo>(team.team[0])

	const scoreboard = await getScoreboard(league)

	const matchups = getPluralItems(scoreboard['0'].matchups)
		.map((m) => m.matchup['0'])
		.map(({ teams }) => teams) as YF.Plural<{
		team: [YF.TeamInfo, YF.TeamStats]
	}>[]

	const current_matchup = matchups.find((matchup) => {
		const exact_team = getPluralItems(matchup)
			.map((m) => flatten<YF.TeamInfo>(m.team[0]))
			.find(({ team_key }) => team_key === t.team_key)

		return exact_team?.team_key === t.team_key
	})

	if (!current_matchup) return null

	const { wins, losses, ties } = team.team[2].team_standings.outcome_totals

	const found_team_index = getPluralItems(current_matchup)
		.map((matchup) => flatten<YF.TeamInfo>(matchup.team[0]))
		.findIndex(({ team_key }) => team_key === t.team_key)

	const wins_this_week =
		current_matchup[found_team_index].team[1].team_points.total
	const losses_this_week =
		current_matchup[found_team_index === 0 ? 1 : 0].team[1].team_points.total
	const ties_this_week = 10 - add(wins_this_week, losses_this_week)

	const projected_wins = add(wins, wins_this_week)
	const projected_losses = add(losses, losses_this_week)
	const projected_ties = add(ties, ties_this_week.toString())

	const projected_pct = (
		(projected_wins + projected_ties / 2) /
		(projected_wins + projected_losses + projected_ties)
	)
		.toFixed(3)
		.replace(/^0\./, '.')

	return (
		<>
			<td className="project-wlt border-l border-dashed tabular-nums">
				{projected_wins}-{projected_losses}-{projected_ties}
			</td>

			<td
				className={cn('projected-pct tabular-nums', {
					'text-green-200': Number(projected_pct) > 0.5,
					'text-red-200': Number(projected_pct) < 0.5,
				})}
			>
				{projected_pct}
			</td>

			<DynamicProjections
				rank={team.team[2].team_standings.rank}
				wins={projected_wins}
				losses={projected_losses}
				percentage={projected_pct}
			/>
		</>
	)
}

function add(...args: string[]) {
	return args.reduce((acc, curr) => acc + Number(curr), 0)
}
