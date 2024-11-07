'use client'

import { HTMLAttributes } from 'react'

import { signOut } from 'firebase/auth'

import {
	getUserDocument,
	googleLogin,
	postUserDocument,
} from '@/services/firebase'

import { cn } from '@/utils'

import { useAuthActions, useIsLogin } from '@/store/auth'
import { auth } from '@/lib/firebase/firebase'

interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
	icon?: boolean
}

function LoginButton(props: LoginButtonProps) {
	const { className, icon = true } = props

	const isLogin = useIsLogin()
	const { setIsLogin } = useAuthActions()

	async function handleSignIn() {
		const loginRes = await googleLogin()

		console.log(loginRes)

		if (!loginRes.userData) {
			alert('로그인에 실패하였습니다.')
			return
		}

		const isExistUser = await getUserDocument(loginRes.userData.uid)

		if (!isExistUser) {
			console.log('new user')
			console.log(loginRes.userData)
			const { displayName, uid, email } = loginRes.userData
			const createdAt = new Date().getTime()
			const newUser = generateUserObject(
				uid,
				email!,
				displayName || email!,
				createdAt,
			)
			await postUserDocument(newUser)
		} else {
			console.log('old user')
		}

		setIsLogin('authenticated')
	}

	async function handleSignOut() {
		await signOut(auth)
		console.log('log out')
	}

	return (
		<button
			className={cn(
				'flex flex-col items-center justify-center',
				className,
				!icon && isLogin === 'authenticated' && 'text-rose-500',
			)}
			onClick={isLogin === 'authenticated' ? handleSignOut : handleSignIn}
			aria-label="login, logout"
		>
			{isLogin === 'authenticated' ? 'logout' : 'login'}
		</button>
	)
}

export default LoginButton

function generateUserObject(
	uid: string,
	email: string,
	displayName: string,
	createdAt: number,
) {
	return { uid, email, displayName, createdAt }
}
