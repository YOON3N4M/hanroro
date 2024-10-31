import GalleryContainer from '@/containers/gallery'
import { getGallery } from '@/services/firebase'
import { GalleryDocsObj } from '@/types'
import React from 'react'

const defaultData = {
	images: [],
	gif: [],
	combine: [],
}

export default async function GalleryPage() {
	// const res = await getGallery()
	// const data = res ? ((await res?.json()).data as GalleryDocsObj) : defaultData
	// const combine = combineImageGif(data)
	// const galleryDocs = { ...data, combine }
	// return <GalleryContainer galleryDocs={galleryDocs} />
	return <></>
}

function combineImageGif(obj: GalleryDocsObj) {
	if (!obj.images) return []
	if (!obj.gif) return []

	const { gif, images } = obj

	const beforeSort = [...images, ...gif]
	const afterSort = beforeSort.sort((a, b) => b.uploadAt - a.uploadAt)

	return afterSort
}
