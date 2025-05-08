import getToken from './getToken'

export async function getLeagues() {
	const token = await getToken()

	const res = await fetch(
		'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=mlb/leagues?format=json',
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`,
			},
		},
	)

	const data = await res.json()

	const leagues =
		data.fantasy_content.users['0'].user[1].games['0'].game[1].leagues['0']
			.league

	return leagues
}

export async function getTeams(league_key: string) {
	const token = await getToken()

	const res = await fetch(
		`https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/teams?format=json`,
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`,
			},
		},
	)

	const data = await res.json()

	return data.fantasy_content.league[1].teams
}
