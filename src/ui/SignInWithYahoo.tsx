import { BASE_URL } from '@/lib/env'

const SIGN_IN_URL = new URL('https://api.login.yahoo.com/oauth2/request_auth')

SIGN_IN_URL.searchParams.set('client_id', process.env.CONSUMER_KEY!)
SIGN_IN_URL.searchParams.set('redirect_uri', `${BASE_URL}/auth/callback`)
SIGN_IN_URL.searchParams.set('response_type', 'code')

export default function SignInWithYahoo() {
	return <a href={SIGN_IN_URL.toString()}>Sign in with Yahoo</a>
}
