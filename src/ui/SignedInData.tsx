import { getLeagues, getStandings } from '@/lib/yf'
import { cn, flatten } from '@/lib/utils'

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

async function Standings({ league }: { league: any }) {
	const standings = await getStandings(league.league_key)
	const teams = Object.values(standings).filter((team: any) => isNaN(team))

	return (
		<div key={league.league_key}>
			<hgroup>
				<h3 className="font-bold">{league.name}</h3>
				<p className="technical text-xs">League</p>
			</hgroup>

			<table className="text-center [&_td]:px-2">
				<tbody>
					{teams.map((team) => {
						const t = flatten<YF.TeamData>(team.team[0])
						const { wins, losses, ties } =
							team.team[2].team_standings.outcome_totals

						return (
							<tr
								className={cn(t.is_owned_by_current_login && 'font-bold')}
								key={t.team_key}
							>
								<td className="w-[2ch] text-center tabular-nums">
									{team.team[2].team_standings.rank}
								</td>

								<td>
									<img
										className="size-8"
										src={t.team_logos[0].team_logo.url}
										width={32}
										height={32}
									/>
								</td>

								<td className="text-left">{t.name} </td>

								<td>
									{t.managers
										.map((manager: any) => manager.manager.nickname)
										.join(', ')}
								</td>

								<td className="tabular-nums">
									{wins}-{losses}-{ties}
								</td>

								<td className="tabular-nums">
									{team.team[2].team_standings.games_back}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
