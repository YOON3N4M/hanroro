import Link from 'next/link'
import LoginButton from '../auth/LoginButton'

interface HeaderProps {}

const NAVIGATION_ITEM = [
	{ name: 'profile', href: '/profile' },
	// { name: "album", href: "/album" },
	{ name: 'gallery', href: '/gallery' },
]

function Header(props: HeaderProps) {
	const {} = props

	return (
		<header className="bg-[#161617cc] text-white text-xs h-nav w-full fixed z-[100]">
			<div className="inner h-full">
				<div className="flex gap-[10%] h-full items-center">
					<div className="">
						<Link href={'/'}>HANRORO</Link>
					</div>
					<nav className="flex gap-lg">
						{NAVIGATION_ITEM.map((item) => (
							<div key={item.name}>
								<Link href={item.href}>{item.name}</Link>
							</div>
						))}
					</nav>
					<div className="ml-auto">
						<LoginButton />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
