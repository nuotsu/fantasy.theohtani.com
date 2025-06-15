'use client'

import { useEffect, useTransition } from 'react'
import { useProjections } from './projections/store'
import { VscRefresh } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function Revalidate({
	revalidate,
}: {
	revalidate: () => Promise<void>
}) {
	const [isPending, startTransition] = useTransition()
	const { setRevalidateDate } = useProjections()

	useEffect(() => {
		if (!isPending) {
			setRevalidateDate(new Date())
		}
	}, [isPending])

	function handleClick() {
		startTransition(revalidate)
	}

	useEffect(() => {
		if (typeof window === 'undefined') return

		window.addEventListener('keydown', (e) => {
			if (e.key === 'r' && !isPending) handleClick()
		})
	}, [])

	useEffect(() => {
		const interval = setInterval(handleClick, 1000 * 30 /* seconds */)
		return () => clearInterval(interval)
	}, [])

	return (
		<button
			className="action-base text-sm"
			onClick={handleClick}
			disabled={isPending}
		>
			<VscRefresh className={cn(isPending && 'animate-spin')} />
			<span className={cn('@max-lg:hidden', isPending && 'animate-pulse')}>
				Refresh
			</span>
		</button>
	)
}
