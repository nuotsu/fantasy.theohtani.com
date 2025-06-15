import { getRoster } from '@/lib/yf'
import { getPluralItems } from '@/lib/utils'
import Player from './Player'

export default async function Roster({ team_key }: { team_key: string }) {
	const roster = await getRoster(team_key)

	const players = getPluralItems<YF.RosterPlayer>(roster[1].roster[0].players)

	return (
		<article>
			{players.map(({ player }) => (
				<Player player={player} key={player[0][0].player_key} />
			))}
		</article>
	)
}
