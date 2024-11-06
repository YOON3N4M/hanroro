import { ReactNode, useEffect } from 'react'
import useModal from './useModal'
import { useIsModalOn } from './store'
import { cn } from '@/utils'

interface ModalTemplateProps {
	children?: ReactNode
	bg?: boolean
}

function ModalTemplate(props: ModalTemplateProps) {
	const { children, bg = true } = props

	const { removeModalElement } = useModal()

	return (
		<div className="absolute left-0 top-0 z-[500] h-[100dvh] w-[100vw]">
			<div className="relative z-[600] flex size-full">
				<div className="absolute z-[700] center">
					<div
						className={cn(
							'p-md max-w-[100vw] max-h-[90dvh] overflow-y-auto',
							bg && 'rounded-[4px] bg-white',
						)}
					>
						{children}
					</div>
				</div>
				<ModalBackGround removeModalElement={removeModalElement} />
			</div>
		</div>
	)
}

export default ModalTemplate

function ModalBackGround({
	removeModalElement,
}: {
	removeModalElement: () => void
}) {
	const isModalOn = useIsModalOn()

	function handleModalClose() {
		removeModalElement()
	}

	function getBodyScrollbarWidth() {
		return window.innerWidth - document.documentElement.offsetWidth
	}

	function blockBodyScroll(className = 'overflow-hidden') {
		const isBlocked = document.body.classList.contains(className)
		if (isBlocked) return

		document.body.style.setProperty(
			'--scrollbar-width',
			`${getBodyScrollbarWidth()}px`,
		)

		document.body.classList.add(className)
	}

	function unblockBodyScroll(className = 'overflow-hidden') {
		const isBlocked = document.body.classList.contains(className)
		if (!isBlocked) return

		document.body.style.removeProperty('--scrollbar-width')
		document.body.classList.remove(className)
	}

	useEffect(() => {
		blockBodyScroll()
		return () => {
			unblockBodyScroll()
		}
	}, [])
	return (
		<div
			onClick={handleModalClose}
			className="absolute left-0 top-0 size-full bg-black opacity-50"
		/>
	)
}
