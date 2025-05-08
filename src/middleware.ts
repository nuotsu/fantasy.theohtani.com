import { BASE_URL, dev } from '@/lib/env'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = JSON.parse(request.cookies.get('token')?.value ?? 'null')

	if (!token?.access_token) {
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

	response.cookies.set('token', JSON.stringify(data), {
		httpOnly: true,
		secure: !dev,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7, // 7 days
	})

	return response
}

export const config = {
	matcher: '/',
}
