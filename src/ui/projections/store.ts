import { create } from 'zustand'

export const useProjections = create<{
	revalidateDate: Date
	setRevalidateDate: (date: Date) => void
}>((set) => ({
	revalidateDate: new Date(),
	setRevalidateDate: (date) => set({ revalidateDate: date }),
}))
