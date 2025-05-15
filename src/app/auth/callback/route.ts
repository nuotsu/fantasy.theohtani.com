import { cookies } from 'next/headers'
import { BASE_URL, dev } from '@/lib/env'
import { redirect } from 'next/navigation'

export async function GET({ url }: Request) {
	const code = new URL(url).searchParams.get('code')

	const res = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`,
			).toString('base64')}`,
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			redirect_uri: `${BASE_URL}/auth/callback`,
			code: code!,
		}),
	})

	const data = await res.json()

	const cookieStore = await cookies()

	cookieStore.set(
		'token',
		JSON.stringify({
			...data,
			expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
		}),
		{
			httpOnly: true,
			secure: !dev,
			sameSite: 'strict',
			maxAge: data.expires_in,
		},
	)

	return redirect('/auth/success')
}
