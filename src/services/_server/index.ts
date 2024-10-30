'use server'

import { revalidateTag } from 'next/cache'
import { API_TAG } from '..'

export async function revalidateApi() {
	revalidateTag(API_TAG.gallery)
}
