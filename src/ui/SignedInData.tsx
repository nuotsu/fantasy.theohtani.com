import { getLeagues } from '@/lib/yf'
import Standings from './Standings'

export default async function SignedInData() {
	const leagues = await getLeagues()

	return (
		<>
			{leagues?.map((league: any) => (
				<Standings league={league} key={league.league_key} />
			))}
		</>
	)
}
