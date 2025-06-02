import { getPluralItems } from '@/lib/utils'
import { getTeam } from '@/lib/yf'
import TeamLogo from '@/ui/team/TeamLogo'
import Move from './Move'

export default async function Transaction({
	transaction,
}: {
	transaction: YF.Transaction
}) {
	const players = getPluralItems<{
		player: [YF.PlayerInfo, YF.TransactionData]
	}>(transaction[1].players).map(({ player }) => player)

	const { transaction_data } =
		(transaction[0].type === 'add/drop' ? players.at(-1) : players[0])?.[1] ??
		{}

	const team_key = Array.isArray(transaction_data)
		? transaction_data[0].type === 'add'
			? transaction_data[0].destination_team_key
			: transaction_data[0].source_team_key
		: transaction_data?.type === 'add'
			? transaction_data?.destination_team_key
			: transaction_data?.source_team_key

	if (!team_key) return null

	const team = await getTeam(team_key)

	const timestamp = new Date(Number(transaction[0].timestamp) * 1000)

	return (
		<li className="scroll-ml-ch shrink-0 snap-start">
			<header className="gap-x-ch flex items-center justify-between">
				<TeamLogo className="size-[2ch]" size={24} team={team} />

				<time
					className="text-fg/50 line-clamp-1 text-xs"
					dateTime={timestamp.toISOString()}
				>
					{new Intl.DateTimeFormat('en-US', {
						dateStyle: 'short',
						timeStyle: 'short',
					}).format(timestamp)}
				</time>
			</header>

			{players.map((player, key) => (
				<Move player={player} key={key} />
			))}
		</li>
	)
}
