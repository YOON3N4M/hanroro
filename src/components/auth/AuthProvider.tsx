'use client'

import { ReactNode, useEffect } from 'react'

import { auth } from '@/lib/firebase/firebase'
import { getUserDocument } from '@/services/firebase'
import { useAuthActions } from '@/store/auth'
import { UserDoc } from '@/types'
import { User, onAuthStateChanged } from 'firebase/auth'

interface AuthProviderProps {
	children: ReactNode
}

function AuthProvider(props: AuthProviderProps) {
	const { children } = props

	const { setIsLogin, setUser, setUserDoc } = useAuthActions()

	useEffect(() => {
		onAuthStateChanged(auth, async (sessionUser: User | null) => {
			if (sessionUser) {
				const userDoc = (await getUserDocument(sessionUser.uid)) as UserDoc
				setIsLogin('authenticated')
				setUser(sessionUser)
				setUserDoc(userDoc)
			} else {
				setIsLogin('unauthenticated')
				setUser(null)
				setUserDoc(null)
			}
		})
	}, [])

	return <div className="w-full h-full">{children}</div>
}

export default AuthProvider
