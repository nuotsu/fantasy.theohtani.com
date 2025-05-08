import getToken from '@/lib/getToken'

export default async function SignedInData() {
	const token = await getToken()

	if (!token.access_token) return <div>No token</div>

	const res = await fetch(
		'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=mlb/leagues?format=json',
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`,
			},
		},
	)

	const data = await res.json()

	const league =
		data.fantasy_content.users['0'].user[1].games['0'].game[1].leagues['0']
			.league[0]

	console.log(data, league)

	return <div>My league name: {league.name}</div>
}
