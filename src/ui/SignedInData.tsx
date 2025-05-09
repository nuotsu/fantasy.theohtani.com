import { getUsersGamesLeagues } from '@/lib/yf'
import { Fragment } from 'react'
import Standings from './Standings'
import Stats from './Stats'

export default async function SignedInData() {
	const { games, leagues } = await getUsersGamesLeagues()

	return (
		<>
			{leagues?.map((league: any) => (
				<Fragment key={league.league_key}>
					<Standings league={league} />
					<Stats game={games['0'].game[0]} league={league} />
				</Fragment>
			))}
		</>
	)
}
