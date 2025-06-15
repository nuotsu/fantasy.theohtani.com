import { cn, flatten } from '@/lib/utils'
import { getTeam } from '@/lib/yf'
import css from './Player.module.css'

export default async function Player({
	player: [playerInfo, playerData, ...rest],
}: YF.RosterPlayer) {
	const { player_key, name, status, status_full, editorial_team_key } =
		flatten<YF.PlayerInfo>(playerInfo)
	const { starting_status } = flatten(rest) as Partial<YF.RosterPlayerStarting>

	const selected = flatten<YF.RosterPlayerData['selected_position']>(
		playerData.selected_position ?? [],
	)

	const s = flatten<YF.RosterPlayerStarting['starting_status']>(
		starting_status ?? [],
	)

	return (
		<dl
			className={cn(
				css.root,
				'grid grid-cols-[1fr_auto] items-center gap-2 px-1',
				{
					'bg-green-400/15': s.is_starting,
					'bg-red-500/20': status,
					'opacity-50': ['BN', 'IL'].includes(selected.position),
				},
			)}
			data-position={selected.position}
			key={player_key}
		>
			<dt
				className={cn('line-clamp-1 grow break-all', {
					'text-red-600 dark:text-red-400':
						status &&
						['60-Day Injured List', 'Not Active'].includes(status_full),
				})}
			>
				{name.full}
			</dt>

			<dd className="shrink-0 text-xs opacity-50">{selected.position}</dd>
		</dl>
	)
}
