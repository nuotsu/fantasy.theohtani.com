import getToken from '@/lib/getToken'
import SignedIn from '@/ui/SignedIn'
import SignInWithYahoo from '@/ui/SignInWithYahoo'

export default async function Home() {
	const token = await getToken()

	return <>{token?.access_token ? <SignedIn /> : <SignInWithYahoo />}</>
}
