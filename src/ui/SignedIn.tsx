import { getUsersGamesLeagues } from '@/lib/yf'
import { Suspense } from 'react'
import Loading from './Loading'
import Standings from './Standings'
import Stats from './Stats'
import TransactionList from './transactions/TransactionList'

export default async function SignedIn() {
	const { games, leagues } = await getUsersGamesLeagues()

	return (
		<>
			{leagues?.map((league: any) => (
				<article className="grid gap-4" key={league.league_key}>
					<Suspense fallback={<Loading>Loading Standings...</Loading>}>
						<Standings league={league} />
					</Suspense>

					<Suspense fallback={<Loading>Loading Stats...</Loading>}>
						<Stats game={games['0'].game[0]} league={league} />
					</Suspense>

					<Suspense fallback={<Loading>Loading Transactions...</Loading>}>
						<TransactionList league={league} />
					</Suspense>
				</article>
			))}
		</>
	)
}
