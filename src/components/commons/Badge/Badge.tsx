import { VariantProps } from 'class-variance-authority'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { badgeVariants } from './badge-variants'
import cn from '@/utils/cn'

interface BadgeProps extends VariantProps<typeof badgeVariants>, HTMLAttributes<HTMLSpanElement> {
	children: ReactNode
	customBadge?: string
	countNumber: number
	maxCountNumber?: number
}

export const Badge: FC<BadgeProps> = ({
	children,
	position,
	className,
	customBadge,
	countNumber,
	maxCountNumber = 9,
	...others
}) => {
	return (
		<div
			{...others}
			className={cn('relative', className)}
		>
			{children}
			<span className={cn(badgeVariants({ position }), 'absolute ', customBadge)}>
				{countNumber > maxCountNumber ? maxCountNumber + '+' : countNumber}
			</span>
		</div>
	)
}
