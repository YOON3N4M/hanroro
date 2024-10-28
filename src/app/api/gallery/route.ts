import { getAllGifs, getAllImages } from '@/services/firebase'
import { NextResponse } from 'next/server'

export async function GET() {
	console.log('dd?')
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
