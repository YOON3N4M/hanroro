export const API_BASE_URL = process.env.API_BASE_URL as string

export const API_TAG = {
	gallery: 'gallery',
	user: 'user',
	schedule: 'schedule',
}

export async function getUserDisplayName(uid: string) {
	try {
		const res = await fetch(
			`${API_BASE_URL}/api/user/?uid=${encodeURIComponent(
				uid,
			)}&displayName=true`,
			{
				cache: 'force-cache',
				next: { tags: [API_TAG.user, uid] },
			},
		)
		return res
	} catch (error) {
		console.log(error)
	}
}
