import cn from '@/utils/cn'
import { VariantProps } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'
import { loaderVariants } from './loaderVariants'

interface LoaderProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof loaderVariants> {}

export const Loader: FC<LoaderProps> = ({ className, size, ...others }) => {
	return (
		<span
			className={cn(loaderVariants({ size }), className)}
			{...others}
		></span>
	)
}
