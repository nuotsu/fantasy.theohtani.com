export default async function Home() {
	const SIGN_IN_URL = new URL('https://api.login.yahoo.com/oauth2/request_auth')
	SIGN_IN_URL.searchParams.set('client_id', process.env.CONSUMER_KEY!)
	SIGN_IN_URL.searchParams.set(
		'redirect_uri',
		`${process.env.BASE_URL}/auth/callback`,
	)
	SIGN_IN_URL.searchParams.set('response_type', 'code')

	const data = await fetch(
		`${process.env.BASE_URL!}/auth/callback?code=testing123`,
	)
	const json = await data.json()

	console.log(json)

	return (
		<>
			<h1>Fantasy Baseball</h1>

			<a href={SIGN_IN_URL.toString()}>Sign in with Yahoo</a>
		</>
	)
}
