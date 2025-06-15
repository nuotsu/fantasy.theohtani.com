export const dev = process.env.NODE_ENV !== 'production'

export const BASE_URL = dev
	? 'https://localhost:3000'
	: 'https://fantasy.theohtani.com'
