import { getAllGifs, getAllImages } from '@/services/firebase'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const imageRes = await getAllImages()
		const gifRes = await getAllGifs()

		const result = {
			images: imageRes,
			gif: gifRes,
		}
		return NextResponse.json(
			{ message: 'success to fetch data', data: result },
			{ status: 200 },
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ message: 'Failed to fetch data', error: error },
			{ status: 500 },
		)
	}
}
