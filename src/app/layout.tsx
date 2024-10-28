import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ModalPortal from '@/components/modal/ModalPortal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'hanroro | panpage',
	description: '한로로 팬페이지',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className="h-full" lang="en">
			<body className="h-full w-full text-authentic-dark">
				<Header />
				<main className="inner h-full bg-white flex flex-col">
					{children}
					<Footer />
				</main>
				<ModalPortal />
			</body>
		</html>
	)
}
