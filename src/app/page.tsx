import MainContainer from '@/containers/main'
import { getGallery } from '@/services/firebase'
import { GalleryDocsObj } from '@/types'

const defaultData: GalleryDocsObj = {
	images: [],
	gif: [],
}

export default async function Home() {
	const res = await getGallery()
	const data = res ? ((await res?.json()).data as GalleryDocsObj) : defaultData

	return <MainContainer galleryDocs={data} />
}
