import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function flatten<T extends Array<Record<string, any>>>(
	arr: Array<Record<string, any> | []>,
): {
	[K in T[number] extends infer U
		? U extends Record<string, any>
			? keyof U
			: never
		: never]: any
} {
	return arr.reduce((acc, item) => {
		if (typeof item === 'object' && !Array.isArray(item)) {
			return { ...acc, ...item }
		}
		return acc
	}, {})
}
