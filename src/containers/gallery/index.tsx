'use client'

import GalleryItem from '@/components/GalleryItem'
import React, { useEffect, useState } from 'react'
import GalleyUploadButton from './Upload'
import { getAllGifs, getAllImages } from '@/services/firebase'

import { MasonryGrid } from '@egjs/react-grid'
import { filterDuple } from '@/utils'
import { GalleryDocsObj, GalleryItemDoc } from '@/types'
import { create } from 'zustand'

interface GalleryContainerProps {
	galleryDocs: GalleryDocsObj
}

export default function GalleryContainer(props: GalleryContainerProps) {
	const { galleryDocs } = props

	const [combinedList, setCombinedList] = useState<GalleryItemDoc[]>(() =>
		combineImageGif(galleryDocs),
	)
	const [uniqueTags, setUniqueTags] = useState<string[]>(() =>
		filterUniqueTags([...galleryDocs.gif, ...galleryDocs.images]),
	)

	function combineImageGif(obj: GalleryDocsObj) {
		if (!obj.images) return []
		if (!obj.gif) return []

		const { gif, images } = obj

		const beforeSort = [...images, ...gif]
		const afterSort = beforeSort.sort((a, b) => b.uploadAt - a.uploadAt)

		return afterSort
	}

	function filterUniqueTags(obj: GalleryItemDoc[]) {
		const allTags = obj.map((doc) => doc.tags)
		const flat = allTags.flat(2)
		const unique = filterDuple(flat)

		return unique
	}

	return (
		<div className="mt-md">
			<div className="flex justify-between">
				<div className="flex">
					<input
						className="bg-white border text-sm px-xs border-authentic-light"
						placeholder="title or tag..."
					/>
				</div>
				<div className="flex">
					<GalleyUploadButton />
				</div>
			</div>
			<div className="flex gap-xs mt-sm text-sm flex-wrap">
				<button className="tag">image</button>
				<button className="tag">gif</button>
				{uniqueTags.map((item, idx) => (
					<button key={`tag-${item}`} className="tag text-xs">
						#{item}
					</button>
				))}
			</div>
			<div className="mt-sm w-full">
				{/* 갤러리 영역 */}
				<MasonryGrid
					column={3}
					gap={5}
					defaultDirection={'end'}
					align={'justify'}
				>
					{combinedList.map((i) => (
						<GalleryItem className="rounded-md" key={i.id} doc={i} />
					))}
				</MasonryGrid>
			</div>
		</div>
	)
}
