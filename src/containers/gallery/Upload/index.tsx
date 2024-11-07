'use client'

import NeedLoginModal from '@/components/modal/form/NeedLoginModal'
import UploadModal from '@/components/modal/form/UploadModal'
import useModal from '@/components/modal/useModal'
import { useUser } from '@/store/auth'
import { cn } from '@/utils'
import React, { ButtonHTMLAttributes } from 'react'

interface GalleyUploadButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GalleyUploadButton(props: GalleyUploadButtonProps) {
	const { className } = props
	const { openSingleModal } = useModal()

	const user = useUser()
	function onClickUpload() {
		if (user) {
			openSingleModal(<UploadModal />)
		} else {
			openSingleModal(<NeedLoginModal />)
		}
	}

	return (
		<button
			onClick={onClickUpload}
			className={cn('button text-xs', className)}
			aria-label="upload image"
		>
			upload
		</button>
	)
}
