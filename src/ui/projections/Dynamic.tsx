'use client'

import { useEffect, useState } from 'react'
import { VscDebugBreakpointFunction } from 'react-icons/vsc'
import { useProjections } from './store'
import WillRevalidate from '@/ui/WillRevalidate'

export default function DynamicProjections({
	rank,
	wins,
	losses,
	percentage,
}: {
	rank: string
	wins: number
	losses: number
	percentage: string
}) {
	const { revalidateDate } = useProjections()

	const [all_projected_pct, setAllProjectedPct] = useState<number[]>([])
	const [leader, setLeader] = useState<
		Partial<{
			wins: string
			losses: string
			ties: string
		}>
	>()

	useEffect(() => {
		if (typeof document === 'undefined') return

		setAllProjectedPct(
			Array.from(document.querySelectorAll('.projected-pct'))
				.map((e) => Number(e.textContent))
				.sort((a, b) => b - a),
		)
	}, [revalidateDate])

	useEffect(() => {
		setLeader(
			document
				.querySelector('[data-projected-rank="1"]')
				?.parentElement?.querySelector('.project-wlt')
				?.textContent?.match(/(?<wins>\d+)-(?<losses>\d+)-(?<ties>\d+)/)
				?.groups ?? {},
		)
	}, [all_projected_pct, revalidateDate])

	const projected_rank =
		all_projected_pct.findIndex((value) => value === Number(percentage)) + 1

	const gb =
		Number(leader?.wins ?? 0) -
		wins +
		(losses - Number(leader?.losses ?? 0)) / 2

	if (projected_rank === 0)
		return (
			<>
				<td>-</td>
				<td></td>
			</>
		)

	return (
		<>
			<td className="tabular-nums">
				<WillRevalidate value={gb ? gb.toFixed(1) : '-'} />
			</td>

			<td className="relative" data-projected-rank={projected_rank}>
				<WillRevalidate value={projected_rank || ''} />

				<div className="*:absolute *:top-1/2 *:right-0 *:-translate-y-1/2">
					{projected_rank < Number(rank) && (
						<VscDebugBreakpointFunction className="text-green-400" />
					)}
					{projected_rank > Number(rank) && (
						<VscDebugBreakpointFunction className="rotate-180 text-red-400" />
					)}
				</div>
			</td>
		</>
	)
}
