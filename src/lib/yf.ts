import getToken from './getToken'
import { Flatten, flatten, getPluralItems } from './utils'

export async function yf<T = any>(endpoint: string) {
	const token = await getToken()

	const res = await fetch(
		`https://fantasysports.yahooapis.com/fantasy/v2${endpoint}?format=json`,
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`,
			},
		},
	)

	return (await res.json()) as T
}

export async function getUsersGamesLeagues() {
	const data = await yf<YF.Users>(
		'/users;use_login=1/games;game_keys=mlb/leagues',
	)

	const users = data.fantasy_content.users

	const games = users['0'].user[1].games
	const leagues = games['0'].game[1].leagues['0'].league

	return {
		users,
		games,
		leagues,
	}
}

export async function getTeams(league_key: string) {
	const data = await yf<YF.Teams>(`/league/${league_key}/teams`)
	return data.fantasy_content.league[1].teams
}

export async function getTeam(team_key: string) {
	const data = await yf<YF.TeamResponse>(`/team/${team_key}`)
	return data.fantasy_content.team[0]
}

export async function getStandings(league_key: string) {
	const data = await yf<YF.Standings>(`/league/${league_key}/standings`)
	return data.fantasy_content.league[1].standings[0].teams
}

export async function getScoreboard(league: YF.LeagueInfo) {
	const data = await yf<YF.Scoreboard>(
		`/league/${league.league_key}/scoreboard`,
	)
	return data.fantasy_content.league[1].scoreboard
}

export async function getStatCategories(game: YF.GameInfo) {
	const data = await yf<YF.StatCategories>(
		`/game/${game.game_key}/stat_categories`,
	)
	return data.fantasy_content.game[1].stat_categories.stats
}

export async function getWeeklyStatWinners(
	matchups: { matchup: YF.Matchup }[],
	stat_ids: string[],
) {
	const teams = matchups
		.flatMap((matchup) =>
			getPluralItems(matchup.matchup['0'].teams).map(({ team }) => team),
		)
		.map((team) => {
			const { team_key } = flatten<YF.TeamInfo>(team[0])
			const { stats } = (team[1] as YF.TeamStats).team_stats

			return {
				team_key,
				stats,
			}
		}) as (Pick<Flatten<YF.TeamInfo>, 'team_key'> &
		Pick<YF.TeamStats['team_stats'], 'stats'>)[]

	return stat_ids
		.filter((stat_id) => !['50', '60'].includes(stat_id))
		.map((stat_id) => {
			const sorted = teams
				.filter(
					(team) =>
						team.stats.find(({ stat }) => stat.stat_id === stat_id)?.stat.value,
				)
				.sort((a, b) => {
					const a_stat = a.stats.find(({ stat }) => stat.stat_id === stat_id)
					const b_stat = b.stats.find(({ stat }) => stat.stat_id === stat_id)

					// lower is better
					if (['26', '27'].includes(stat_id))
						return Number(a_stat?.stat.value) > Number(b_stat?.stat.value)
							? 1
							: -1

					// higher is better
					return Number(a_stat?.stat.value) < Number(b_stat?.stat.value)
						? 1
						: -1
				})

			const winners = sorted.filter(
				(team) =>
					team.stats.find((stat) => stat.stat.stat_id === stat_id)?.stat
						.value ===
					sorted[0].stats.find((stat) => stat.stat.stat_id === stat_id)?.stat
						.value,
			)

			return {
				stat_id,
				team_keys: winners.map((team) => team.team_key),
			}
		})
}

export async function getRoster(team_key: string) {
	const data = await yf<YF.RosterResponse>(`/team/${team_key}/roster`)
	return data.fantasy_content.team
}

export async function getTransactions(
	league_key: string,
	{
		count,
	}: {
		count: number
	} = {
		count: 10,
	},
) {
	const data = await yf<YF.Transactions>(
		`/league/${league_key}/transactions;count=${count}`,
	)
	return data.fantasy_content.league[1].transactions
}
