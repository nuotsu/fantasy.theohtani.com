import { getLeagues, getStandings } from '@/lib/yf'
import { cn } from '@/lib/utils'

export default async function SignedInData() {
	const leagues = await getLeagues()

	return (
		<div>
			<h2>My Leagues:</h2>
			<ul className="list-disc pl-4">
				{leagues?.map((league: any) => (
					<li key={league.league_key}>
						<Leagues league={league} />
					</li>
				))}
			</ul>
		</div>
	)
}

async function Leagues({ league }: { league: any }) {
	const standings = await getStandings(league.league_key)
	const teams = Object.values(standings).filter((team: any) => isNaN(team))

	return (
		<div key={league.league_key}>
			<h3 className="font-bold">{league.name}</h3>
			<ol className="list-decimal pl-4">
				{teams.map((team: any) => {
					const t = team.team[0]
					const isOwner = t[3]?.is_owned_by_current_login

					return (
						<li className={cn(isOwner && 'font-bold')} key={t[0].team_key}>
							{t[2].name}
						</li>
					)
				})}
			</ol>
		</div>
	)
}
