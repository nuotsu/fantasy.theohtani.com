import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type Flatten<T extends Array<Record<string, any>>> = {
	[K in T[number] extends infer U
		? U extends Record<string, any>
			? keyof U
			: never
		: never]: any
}

export function flatten<T extends Array<Record<string, any>>>(
	arr: Array<Record<string, any> | []>,
): Flatten<T> {
	return arr.reduce((acc, item) => {
		if (typeof item === 'object' && !Array.isArray(item)) {
			return { ...acc, ...item }
		}
		return acc
	}, {})
}

export function getPluralItems(obj: YF.Plural<any>) {
	return Object.entries(obj)
		.filter(([key]) => !isNaN(Number(key)))
		.map(([, value]) => value)
}
