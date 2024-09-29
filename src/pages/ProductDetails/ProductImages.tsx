import { Image } from '@/components/elements'
import { memo } from 'react'

interface ProductImaegsProps {
	images: string[]
}

export const ProductImages = memo(({ images }: ProductImaegsProps) => {
	return (
		<div className='flex gap-5 flex-wrap pb-[46px]'>
			{images.map(image => (
				<Image
					key={image}
					src={image}
					containerClassName='flex-1 basis-[270px]'
				/>
			))}
		</div>
	)
})
