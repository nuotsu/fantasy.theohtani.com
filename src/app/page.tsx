import getToken from '@/lib/getToken'
import SignedInData from '@/ui/SignedInData'
import SignInWithYahoo from '@/ui/SignInWithYahoo'

export default async function Home() {
	const token = await getToken()

	return (
		<>
			<h1>Fantasy Baseball</h1>

			{token?.access_token ? (
				<>
					<p>Signed In</p>
					<SignedInData />
				</>
			) : (
				<SignInWithYahoo />
			)}
		</>
	)
}
