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
		<html lang="en" className="no-scrollbar">
			<body className="bg-bg text-fg antialiased">
				<main className="pt-ch flex min-h-svh flex-col pb-[max(env(safe-area-inset-bottom),1ch)]">
					{children}
				</main>
			</body>

			<Analytics />
		</html>
	)
}
