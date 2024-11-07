import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ModalPortal from '@/components/modal/ModalPortal'
import Toolbar from './Toolbar'
import localFont from 'next/font/local'
import { cn } from '@/utils'
import { API_BASE_URL } from '@/services'
import AuthProvider from '@/components/auth/AuthProvider'
import { GoogleAnalytics } from '@next/third-parties/google'

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS as string
const GOOGLE_SEARCH_VERIFICATION = process.env
	.GOOGLE_SEARCH_VERIFICATION as string

export const metadata: Metadata = {
	title: 'hanroro | fanpage',
	description: '한로로 팬페이지',
	icons: {
		icon: '/favicon.svg',
	},
	metadataBase: new URL(API_BASE_URL),
	openGraph: {
		images: [
			{
				url: '/images/profile/profile.jpg',
				alt: '한로로',
			},
		],
	},
	//google search console
	verification: {
		google: GOOGLE_SEARCH_VERIFICATION,
		other: {
			'naver-site-verification': 'fdecb3ed7af2113b9668ebf39d0e77bea6d8e4e7',
		},
	},
}

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className="h-full" lang="en">
			<body className={cn('h-full w-full', `${pretendard.variable}`)}>
				<h1 className="visually-hidden">hanroro | fanpage</h1>
				<AuthProvider>
					<Header />
					<main className="h-full bg-black flex flex-col pt-nav">
						{children}
						<Footer />
					</main>
					<ModalPortal />
					{API_BASE_URL?.includes('localhost') && <Toolbar />}
				</AuthProvider>
			</body>
			<GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
		</html>
	)
}
