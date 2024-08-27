import { Image } from '@/components/elements'

interface ProductImaegsProps {
	images: string[]
}

export const ProductImages = ({ images }: ProductImaegsProps) => {
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
}
