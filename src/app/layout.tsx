import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '@/app.css'
import type { Metadata } from 'next'

const font_sans = Geist({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Fantasy Baseball',
	description: 'Fantasy Baseball',
	icons: 'https://fav.farm/🏆',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="bg-bg text-fg antialiased">
				<main>{children}</main>
			</body>
			<Analytics />
		</html>
	)
}
