import { FC, HTMLAttributes, memo } from 'react'
import { VariantProps } from 'class-variance-authority'

import cn from '@/utils/cn'
import { headingVariants } from './text-variants'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {}

export const Text: FC<HeadingProps> = memo(({ children, variant, level, className, ...others }) => {
	return (
		<h2
			className={cn(headingVariants({ variant, level }), className)}
			{...others}
		>
			{children}
		</h2>
	)
})
