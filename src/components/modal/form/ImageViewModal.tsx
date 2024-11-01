'use client'

import React, { useEffect, useState } from 'react'
import ModalTemplate from '../ModalTemplate'
import { GalleryItemDoc } from '@/types'
import Image from 'next/image'
import { cn } from '@/utils'

interface ImageViewModalProps {
	imageDoc: GalleryItemDoc
}

export default function ImageViewModal(props: ImageViewModalProps) {
	const { imageDoc } = props
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		console.log(isLoading)
	}, [isLoading])

	return (
		<ModalTemplate bg={false}>
			<Image
				width={3000}
				height={3000}
				src={imageDoc.url}
				alt={imageDoc.title}
				className={cn(
					'pc:max-h-[80vh] object-cover pc:w-auto mo:max-w-[80vw]',
					isLoading && 'opacity-0',
				)}
				onLoad={() => setIsLoading(false)}
			/>
			{!isLoading && (
				<div className="absolute top-full mt-md text-sm text-white">
					<span className="text-md font-bold">{imageDoc.title}</span>
					<div className="flex gap-xs mt-xs">
						{imageDoc.tags.map((tag, idx) => (
							<span key={`${imageDoc.id}-${idx}`} className="">
								#{tag}
							</span>
						))}
					</div>
				</div>
			)}
		</ModalTemplate>
	)
}
