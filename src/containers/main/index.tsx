'use client'

import GalleryItem from '@/components/GalleryItem'
import Recommend from './Recommend'
import Footer from '@/components/layout/Footer'
import { GalleryDocsObj } from '@/types'

interface MainContainerProps {
	galleryDocs: GalleryDocsObj
}

function MainContainer(props: MainContainerProps) {
	const { galleryDocs } = props
	console.log(galleryDocs)
	return (
		<div className="h-full">
			<section>
				<h2 className="text-authentic-dark text-sm">calendar</h2>
				<div></div>
			</section>
			<section className="mt-md">
				<h2 className="text-authentic-dark text-sm">gallery</h2>
				<div className="grid grid-cols-4 gap-xxs mt-sm">
					{/* {testArr.map((i) => (
            <GalleryItem className="aspect-[1/1] rounded-md" key={i} />
          ))} */}
				</div>
				<div className="flex justify-end mt-sm">
					<span className="text-sm">more</span>
				</div>
			</section>
			<section className="mt-md">
				<Recommend />
			</section>
		</div>
	)
}

export default MainContainer
