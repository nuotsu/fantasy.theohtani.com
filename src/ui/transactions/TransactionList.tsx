import { getTransactions } from '@/lib/yf'
import { cn, getPluralItems } from '@/lib/utils'
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

	const groupByDate = transactions.reduce(
		(acc, { transaction }) => {
			const date = new Date(Number(transaction[0].timestamp) * 1000)
			const dateKey = new Intl.DateTimeFormat('en-US', {
				weekday: 'short',
				month: 'short',
				day: 'numeric',
			}).format(date)

			acc[dateKey] = acc[dateKey] || []
			acc[dateKey].push(transaction)
			return acc
		},
		{} as Record<string, YF.Transaction[]>,
	)

	return (
		<section>
			<h2 className="sr-only">Recent Transactions</h2>

			<div className="gap-ch no-scrollbar grid snap-x snap-mandatory auto-cols-[18ch] grid-flow-col grid-rows-[auto_auto] overflow-x-auto overflow-y-clip">
				{Object.entries(groupByDate).map(([date, transactions], i) => (
					<div className="contents" key={date}>
						<h2 style={{ gridColumn: `span ${transactions.length}` }}>
							<time className="left-ch sticky" dateTime={date}>
								{date}
							</time>
						</h2>

						<ul
							className={cn('contents', {
								'*:first:pl-ch': i === 0,
								'*:last:pr-[2ch]': i === Object.keys(groupByDate).length - 1,
							})}
						>
							{transactions.map((transaction) => (
								<Transaction
									transaction={transaction}
									key={transaction[0].transaction_key}
								/>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	)
}
