import { dbService } from '@/lib/firebase/firebase'
import { GalleryItemDoc } from '@/types'
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { API_BASE_URL, API_TAG } from '.'

export async function uploadImage(document: GalleryItemDoc) {
	const collectionName = document.isGif ? 'gifs' : 'images'

	const ref = collection(dbService, collectionName)

	const newImageDoc = await addDoc(ref, document)
	const newImageRef = doc(dbService, collectionName, newImageDoc.id)

	await updateDoc(newImageRef, {
		id: newImageDoc.id,
	})
}
export async function getGallery() {
	try {
		const res = await fetch(`${API_BASE_URL}/api/gallery/`, {
			next: { tags: [API_TAG.gallery] },
		})
		return res
	} catch (error) {
		console.log(error)
	}
}

export async function getAllImages() {
	const collectionRef = collection(dbService, 'images')

	try {
		const querySnapshot = await getDocs(collectionRef)
		const documents = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		return documents as GalleryItemDoc[]
	} catch (error) {
		console.error('문서 가져오기 오류:', error)
	}
}

export async function getAllGifs() {
	const collectionRef = collection(dbService, 'gifs')

	try {
		const querySnapshot = await getDocs(collectionRef)
		const documents = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		return documents as GalleryItemDoc[]
	} catch (error) {
		console.error('문서 가져오기 오류:', error)
	}
}
