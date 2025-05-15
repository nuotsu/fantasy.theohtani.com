'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/ui/Loading'

export default function AuthSuccess() {
	const router = useRouter()

	useEffect(() => {
		router.push('/')
	}, [router])

	return <Loading />
}
