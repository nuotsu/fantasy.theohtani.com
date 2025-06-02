import { BASE_URL, dev } from '@/lib/env'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = JSON.parse(request.cookies.get('token')?.value ?? 'null')

	if (
		!token?.expires_at ||
		new Date().getTime() >= new Date(token.expires_at).getTime()
	) {
		return NextResponse.next()
	}

	const res = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`,
			).toString('base64')}`,
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			redirect_uri: `${BASE_URL}/auth/callback`,
			refresh_token: token.refresh_token,
		}),
	})

	const data = await res.json()

	const response = NextResponse.next()

	response.cookies.set(
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

	return response
}

export const config = {
	matcher: '/',
}
