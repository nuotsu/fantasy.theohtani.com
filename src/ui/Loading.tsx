import { VscLoading } from 'react-icons/vsc'

export default function Loading() {
	return (
		<aside className="inline-flex place-content-center items-center gap-2">
			<VscLoading className="animate-spin" />
			Loading...
		</aside>
	)
}
