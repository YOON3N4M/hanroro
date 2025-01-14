import React, { AnchorHTMLAttributes, HTMLAttributes } from 'react'

interface NewTabAnchorProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function NewTabAnchor(props: NewTabAnchorProps) {
	const { children, href, className, ...attrs } = props
	return (
		<a
			className={className}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={href}
			{...attrs}
		>
			{children}
		</a>
	)
}
