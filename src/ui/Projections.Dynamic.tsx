'use client'

import { useEffect, useState } from 'react'
import { VscDebugBreakpointFunction } from 'react-icons/vsc'

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
	}, [])

	useEffect(() => {
		setLeader(
			document
				.querySelector('[data-projected-rank="1"]')
				?.parentElement?.querySelector('.project-wlt')
				?.textContent?.match(/(?<wins>\d+)-(?<losses>\d+)-(?<ties>\d+)/)
				?.groups ?? {},
		)
	}, [all_projected_pct])

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
			<td className="tabular-nums">{gb ? gb.toFixed(1) : '-'}</td>
			<td
				className="relative *:absolute *:top-1/2 *:right-0 *:-translate-y-1/2"
				data-projected-rank={projected_rank}
			>
				{projected_rank || ''}
				{projected_rank < Number(rank) && (
					<VscDebugBreakpointFunction className="text-green-400" />
				)}
				{projected_rank > Number(rank) && (
					<VscDebugBreakpointFunction className="rotate-180 text-red-400" />
				)}
			</td>
		</>
	)
}
