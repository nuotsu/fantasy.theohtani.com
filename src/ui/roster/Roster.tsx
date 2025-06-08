import { getRoster } from '@/lib/yf'
import { cn, flatten, getPluralItems } from '@/lib/utils'
import css from './Roster.module.css'

export default async function Roster({ team_key }: { team_key: string }) {
	const roster = await getRoster(team_key)

	const players = getPluralItems<YF.RosterPlayer>(roster[1].roster[0].players)

	return (
		<article>
			{players.map(({ player: [playerInfo, playerData, ...rest] }) => {
				const { player_key, name } = flatten<YF.RosterPlayerInfo>(playerInfo)
				const { starting_status } = flatten(
					rest,
				) as Partial<YF.RosterPlayerStarting>

				const selected = flatten<YF.RosterPlayerData['selected_position']>(
					playerData.selected_position ?? [],
				)

				const s = flatten<YF.RosterPlayerStarting['starting_status']>(
					starting_status ?? [],
				)

				return (
					<dl
						className={cn(
							css.player,
							'grid grid-cols-[1fr_auto] items-center gap-2 px-1',
							{
								'bg-green-400/15': s.is_starting,
								'opacity-50': ['BN', 'IL'].includes(selected.position),
							},
						)}
						data-position={selected.position}
						key={player_key}
					>
						<dt className="line-clamp-1 grow break-all">{name.full}</dt>

						<dd className="shrink-0 text-xs opacity-50">{selected.position}</dd>
					</dl>
				)
			})}
		</article>
	)
}
