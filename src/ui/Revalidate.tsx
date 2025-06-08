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

	return (
		<button
			className="action-base text-sm"
			onClick={() => {
				startTransition(revalidate)
			}}
			disabled={isPending}
		>
			<VscRefresh className={cn(isPending && 'animate-spin')} />
			<span className={cn('@max-lg:hidden', isPending && 'animate-pulse')}>
				Refresh
			</span>
		</button>
	)
}
