export async function GET({ url }: Request) {
	const code = new URL(url).searchParams.get('code')

	return Response.json({
		code,
	})
}
