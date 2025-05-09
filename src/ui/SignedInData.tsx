import { getLeagues } from '@/lib/yf'
import { Fragment } from 'react'
import Standings from './Standings'
import Stats from './Stats'

export default async function SignedInData() {
	const leagues = await getLeagues()

	return (
		<>
			{leagues?.map((league: any) => (
				<Fragment key={league.league_key}>
					<Standings league={league} />
					<Stats league={league} />
				</Fragment>
			))}
		</>
	)
}
