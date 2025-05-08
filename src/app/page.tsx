import { cookies } from 'next/headers'
import SignInWithYahoo from '@/ui/SignInWithYahoo'

export default async function Home() {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')

	const parsedToken = JSON.parse(token?.value ?? '{}')

	return (
		<>
			<h1>Fantasy Baseball</h1>

			{parsedToken ? <>Signed In</> : <SignInWithYahoo />}
		</>
	)
}
