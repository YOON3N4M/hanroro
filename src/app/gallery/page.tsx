import GalleryContainer from '@/containers/gallery'
import { getGallery } from '@/services/firebase'
import { GalleryDocsObj } from '@/types'
import React from 'react'

export default async function GalleryPage() {
	const res = await getGallery()
	const data = (await res?.json()).data as GalleryDocsObj
	return <GalleryContainer galleryDocs={data} />
}
