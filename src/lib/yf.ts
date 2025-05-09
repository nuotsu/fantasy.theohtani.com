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

export async function getLeagues() {
	const data = await yf<YF.Users>(
		'/users;use_login=1/games;game_keys=mlb/leagues',
	)
	return data.fantasy_content.users['0'].user[1].games['0'].game[1].leagues['0']
		.league
}

export async function getTeams(league_key: string) {
	const data = await yf<YF.Teams>(`/league/${league_key}/teams`)
	return data.fantasy_content.league[1].teams
}

export async function getStandings(league_key: string) {
	const data = await yf<YF.Standings>(`/league/${league_key}/standings`)
	return data.fantasy_content.league[1].standings[0].teams
}
