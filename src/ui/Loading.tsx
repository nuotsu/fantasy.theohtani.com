import { VscLoading } from 'react-icons/vsc'

export default function Loading({ children }: React.ComponentProps<'aside'>) {
	return (
		<aside
			className="m-auto inline-flex place-content-center items-center gap-2"
			data-loading
		>
			<VscLoading className="animate-spin" />
			{children || 'Loading...'}
		</aside>
	)
}
