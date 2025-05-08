import { cn } from '@/lib/utils'
import { getLeagues, getTeams } from '@/lib/yf'

export default async function SignedInData() {
	const leagues = await getLeagues()

	return (
		<div>
			<h2>My Leagues:</h2>
			<ul className="list-disc pl-4">
				{leagues?.map((league: any) => (
					<li key={league.league_key}>
						<League league={league} />
					</li>
				))}
			</ul>
		</div>
	)
}

async function League({ league }: { league: any }) {
	const teams = await getTeams(league.league_key)
	const filteredTeams = Object.values(teams).filter((team: any) => isNaN(team))

	return (
		<div key={league.league_key}>
			<h3 className="font-bold">{league.name}</h3>
			<ul>
				{filteredTeams.map((team: any) => {
					const isOwner = team.team[0][3]?.is_owned_by_current_login

					return (
						<li
							className={cn(isOwner && 'font-bold')}
							key={team.team[0].team_key}
						>
							{team.team[0][2].name}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
