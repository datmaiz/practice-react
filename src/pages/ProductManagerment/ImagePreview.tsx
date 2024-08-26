import { FC, memo } from 'react'

import { CloseIcon } from '@/assets/icons/outlined'

interface ImagePreviewProps {
	src: string
	onDelete: (src: string) => void
}

export const ImagePreview: FC<ImagePreviewProps> = memo(({ src, onDelete }) => {
	return (
		<figure className='w-24 aspect-[2/3] flex-shrink-0 relative'>
			<CloseIcon
				width={15}
				height={15}
				onClick={() => onDelete(src)}
				className='absolute top-2 right-2 hover:text-secondary cursor-pointer'
			/>
			<img
				src={src}
				alt='image preview'
				className='w-full h-full object-cover'
			/>
		</figure>
	)
})
