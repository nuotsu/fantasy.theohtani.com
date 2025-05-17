import { getUsersGamesLeagues } from '@/lib/yf'
import Standings from './Standings'
import Stats from './Stats'

export default async function SignedIn() {
	const { games, leagues } = await getUsersGamesLeagues()

	return (
		<>
			{leagues?.map((league: any) => (
				<section className="grid gap-4 py-4" key={league.league_key}>
					<Standings league={league} />
					<Stats game={games['0'].game[0]} league={league} />
				</section>
			))}
		</>
	)
}
