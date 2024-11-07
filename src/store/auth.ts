import { UserDoc } from '@/types'
import { User } from 'firebase/auth'
import { create } from 'zustand'

type LoginStatus = 'initial' | 'authenticated' | 'unauthenticated'

interface AuthStore {
	isLogin: LoginStatus
	user: User | null
	userDoc: UserDoc | null
	actions: {
		setIsLogin: (isLogin: LoginStatus) => void
		setUser: (user: User | null) => void
		setUserDoc: (userDoc: UserDoc | null) => void
	}
}

const useAuthStore = create<AuthStore>((set) => ({
	isLogin: 'initial',
	user: null,
	userDoc: null,
	actions: {
		setIsLogin: (isLogin) => set({ isLogin }),
		setUser: (user) => set({ user }),
		setUserDoc: (userDoc) => set({ userDoc }),
	},
}))

export const useIsLogin = () => useAuthStore((state) => state.isLogin)
export const useUser = () => useAuthStore((state) => state.user)
export const useUserDoc = () => useAuthStore((state) => state.userDoc)

export const useAuthActions = () => useAuthStore((state) => state.actions)
