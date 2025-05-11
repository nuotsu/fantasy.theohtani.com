import { flatten } from '@/lib/utils'

export default function TeamLogo({
	team,
	size = 32,
	...props
}: {
	team: YF.TeamInfo
	size?: number
} & React.ComponentProps<'img'>) {
	const t = flatten<YF.TeamInfo>(team)
	const { url } = t.team_logos[0].team_logo

	return <img src={url} alt={t.name} width={size} height={size} {...props} />
}
