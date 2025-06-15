export const dev = process.env.NODE_ENV !== 'production'

export const BASE_URL = dev
	? // 'https://fantasy-theohtani.loca.lt'
		'https://localhost:3000'
	: 'https://fantasy.theohtani.com'
