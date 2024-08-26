import cn from '@/utils/cn'
import { HTMLAttributes, ReactNode } from 'react'

interface ClientContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

export const ClientContainer = ({ children, className, ...others }: ClientContainerProps) => {
	return (
		<div
			className={cn('w-full px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20', className)}
			{...others}
		>
			{children}
		</div>
	)
}
