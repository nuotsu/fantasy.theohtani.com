export const dev = process.env.NODE_ENV !== 'production'

export const BASE_URL = dev
	? // ? 'https://picked-condor-severely.ngrok-free.app'
		'https://fantasy-theohtani.loca.lt'
	: 'https://fantasy.theohtani.com'
