'use server'

import { revalidateTag } from 'next/cache'
import { API_BASE_URL, API_TAG } from '..'

export async function revalidateApi(tag: string) {
	revalidateTag(tag)
}

export async function getGallery() {
	try {
		const res = await fetch(`${API_BASE_URL}/api/gallery/`, {
			cache: 'force-cache',
			next: { tags: [API_TAG.gallery] },
		})
		return res
	} catch (error) {
		console.log(error)
	}
}

export async function getSchedule() {
	try {
		const res = await fetch(`${API_BASE_URL}/api/schedule/`, {
			cache: 'force-cache',
			next: { tags: [API_TAG.schedule] },
		})
		return res
	} catch (error) {
		console.log(error)
	}
}
