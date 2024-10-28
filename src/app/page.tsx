import MainContainer from '@/containers/main'
import { getGallery } from '@/services/firebase'
import { GalleryDocsObj } from '@/types'

export default async function Home() {
	const res = await getGallery()
	const data = (await res?.json()).data as GalleryDocsObj

	return <MainContainer galleryDocs={data} />
}
