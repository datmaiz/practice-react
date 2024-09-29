import cn from '@/utils/cn'
import { VariantProps } from 'class-variance-authority'
import { FC, ImgHTMLAttributes, memo } from 'react'
import { imageVariants } from './image-variants'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof imageVariants> {
	containerClassName?: string
}

export const Image: FC<ImageProps> = memo(({ containerClassName, className, shape, ...others }) => {
	return (
		<figure className={cn(imageVariants({ shape }), 'overflow-hidden', containerClassName)}>
			<img
				className={cn('w-full h-full object-cover', className)}
				{...others}
			/>
		</figure>
	)
})
