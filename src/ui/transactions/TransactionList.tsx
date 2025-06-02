import { getTransactions } from '@/lib/yf'
import { getPluralItems } from '@/lib/utils'
import Transaction from './Transaction'

export default async function TransactionList({
	league,
}: {
	league: YF.LeagueInfo
}) {
	const data = await getTransactions(league.league_key)
	const transactions = getPluralItems(data) as Array<{
		transaction: YF.Transaction
	}>

	return (
		<article>
			<h2 className="sr-only">Recent Transactions</h2>

			<ul className="gap-ch px-ch flex snap-x snap-mandatory overflow-x-auto">
				{transactions?.map(({ transaction }) => (
					<Transaction
						transaction={transaction}
						key={transaction[0].transaction_key}
					/>
				))}
			</ul>
		</article>
	)
}
