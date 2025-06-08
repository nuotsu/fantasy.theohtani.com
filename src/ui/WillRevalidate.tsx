'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function WillRevalidate({ value }: { value: any }) {
	const [ready, setReady] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setReady(true)
		}, 4000)
	}, [])

	return (
		<span
			className={cn('animate-revalidated', !ready && 'will-revalidate')}
			key={value}
		>
			{value}
		</span>
	)
}
