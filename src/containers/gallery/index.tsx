'use client'

import GalleryItem from '@/components/GalleryItem'
import React, { useEffect, useState } from 'react'
import GalleyUploadButton from './Upload'
import { getAllGifs, getAllImages } from '@/services/firebase'

import { MasonryGrid } from '@egjs/react-grid'
import { filterDuple } from '@/utils'

export default function GalleryContainer() {
	const [combinedList, setCombinedList] = useState<any[]>([])
	const [gifs, setGifs] = useState<any[]>([])
	const [images, setImages] = useState<any[]>([])
	const [uniqueTags, setUniqueTags] = useState<any[]>([])

	useEffect(() => {
		async function init() {
			const imagesRes = await getAllImages()
			const gifsRes = await getAllGifs()

			if (!imagesRes) return
			if (!gifsRes) return

			setImages(imagesRes)
			setGifs(gifsRes)
			const combine: any[] = [...imagesRes, ...gifsRes]
			setCombinedList(combine)
			const basicTags = combine.map((doc) => doc.tags)
			const flat = basicTags.flat(2)
			const unique = filterDuple(flat)
			setUniqueTags(unique)
		}
		init()
	}, [])

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
				{/* <MasonryGrid column={3} gap={5} defaultDirection={"end"} align={"justify"}>
          {combinedList.map((i) => (
            <GalleryItem className="rounded-md" key={i.id} doc={i} />
          ))}
        </MasonryGrid> */}
				{/* <div className="flex gap-xxxs mt-sm items-start">
          {combinedList.map((i) => (
            <GalleryItem className="rounded-md" key={i.id} doc={i} />
          ))}
        </div> */}
			</div>
		</div>
	)
}
