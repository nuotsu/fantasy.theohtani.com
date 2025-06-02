import { cn, flatten } from '@/lib/utils'

export default function Move({
	player: [player_info, { transaction_data }],
}: {
	player: [YF.PlayerInfo, YF.TransactionData]
}) {
	const info = flatten<YF.PlayerInfo>(player_info)

	if (Array.isArray(transaction_data)) {
		return transaction_data.map((item, key) => (
			<Item player_info={player_info} transaction_data={item} key={key} />
		))
	}

	return <Item player_info={player_info} transaction_data={transaction_data} />
}

function Item({
	player_info,
	transaction_data: { type },
}: {
	player_info: YF.PlayerInfo
	transaction_data: YF.TransactionAddData | YF.TransactionDropData
}) {
	const { name, editorial_team_abbr, display_position } =
		flatten<YF.PlayerInfo>(player_info)

	return (
		<dl
			className={cn(
				'grid w-[16ch] grid-cols-[auto_1fr] gap-x-[.5ch] px-[.5ch]',
				{
					'bg-green-400/15': type === 'add',
					'bg-red-400/15': type === 'drop',
				},
			)}
		>
			<dt
				className={cn('w-ch shrink-0 text-center', {
					'text-green-400': type === 'add',
					'text-red-400': type === 'drop',
				})}
			>
				{type === 'add' ? '+' : '-'}
			</dt>

			<dd className="line-clamp-1">{name.full}</dd>

			<dd className="text-fg/50 gap-x-ch col-start-2 flex items-center justify-between text-xs">
				<span>{display_position.replaceAll(',', '/')}</span>
				<span>{editorial_team_abbr}</span>
			</dd>
		</dl>
	)
}
