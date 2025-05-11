import getToken from './getToken'

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

	const data = await res.json()

	return data as T
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

export async function getStandings(league_key: string) {
	const data = await yf<YF.Standings>(`/league/${league_key}/standings`)
	return data.fantasy_content.league[1].standings[0].teams
}

export async function getScoreboard(league: YF.League) {
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
