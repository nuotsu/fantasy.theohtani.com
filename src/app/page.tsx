import getToken from '@/lib/getToken'
import SignedIn from '@/ui/SignedIn'
import Image from 'next/image'
import SignInWithYahoo from '@/ui/SignInWithYahoo'

export default async function Home() {
	const token = await getToken()

	return (
		<>
			{token?.access_token ? (
				<SignedIn />
			) : (
				<section className="m-auto grid place-items-center gap-4">
					<h1>
						<strong>Fantasy</strong> by <strong>TheOhtani.com</strong>
					</h1>

					<SignInWithYahoo />

					<Image
						className="w-xl"
						src="/preview.png"
						alt=""
						width={3104}
						height={1766}
						loading="eager"
						priority
					/>

					<p className="text-fg/50 -mt-lh text-center text-xs">
						Built by{' '}
						<a
							className="underline"
							href="https://github.com/nuotsu/fantasy.theohtani.com"
						>
							nuotsu
						</a>
					</p>
				</section>
			)}
		</>
	)
}
