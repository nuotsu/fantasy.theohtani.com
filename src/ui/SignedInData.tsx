import { getLeagues, getStandings } from '@/lib/yf'
import { cn } from '@/lib/utils'

export default async function SignedInData() {
	const leagues = await getLeagues()

	return (
		<>
			{leagues?.map((league: any) => (
				<Leagues league={league} key={league.league_key} />
			))}
		</>
	)
}

async function Leagues({ league }: { league: any }) {
	const standings = await getStandings(league.league_key)
	const teams = Object.values(standings).filter((team: any) => isNaN(team))

	return (
		<div key={league.league_key}>
			<hgroup>
				<h3 className="font-bold">{league.name}</h3>
				<p className="technical text-xs">League</p>
			</hgroup>

			<table>
				<tbody>
					{teams.map((team: any) => {
						const t = team.team[0]
						const isOwner = t[3]?.is_owned_by_current_login

						return (
							<tr
								className={cn('flex items-center', isOwner && 'font-bold')}
								key={t[0].team_key}
							>
								<td className="w-[2ch] text-center tabular-nums">
									{team.team[2].team_standings.rank}
								</td>

								<td>
									<img
										className="size-8"
										src={t[5].team_logos[0].team_logo.url}
										width={32}
										height={32}
									/>
								</td>

								<td>
									{t[2].name}{' '}
									<span className="technical block text-xs">
										{t[19].managers
											.map((manager: any) => manager.manager.nickname)
											.join(', ')}
									</span>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
