import GalleryContainer from '@/containers/gallery'
import { getGallery } from '@/services/firebase'
import { GalleryDocsObj } from '@/types'
import React from 'react'

export default async function GalleryPage() {
	const res = await getGallery()
	const data = (await res?.json()).data as GalleryDocsObj
	const combine = combineImageGif(data)
	return <GalleryContainer galleryDocs={{ ...data, combine }} />
}

function combineImageGif(obj: GalleryDocsObj) {
	if (!obj.images) return []
	if (!obj.gif) return []

	const { gif, images } = obj

	const beforeSort = [...images, ...gif]
	const afterSort = beforeSort.sort((a, b) => b.uploadAt - a.uploadAt)

	return afterSort
}
