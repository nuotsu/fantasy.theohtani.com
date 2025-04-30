import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '@/styles/app.css'

const font_sans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Fantasy Baseball',
	description: 'Fantasy Baseball',
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
		</html>
	)
}
