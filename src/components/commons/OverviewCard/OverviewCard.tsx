import { Text } from '@/components/elements'
import cn from '@/utils/cn'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface OverviewCardProps extends HTMLAttributes<HTMLElement> {
	icon: ReactNode
	title: string
	quantity: number
}

export const OverviewCard: FC<OverviewCardProps> = ({ className, icon, title, quantity, ...others }) => {
	return (
		<div
			className={cn('min-w-[255px] p-5 relative overflow-hidden rounded-[8px]', className)}
			{...others}
		>
			<div className='absolute inset-0 bg-current opacity-20 pointer-events-none'></div>
			{icon}
			<Text
				variant={'secondary-regular'}
				level={'h8'}
				className='pt-[15px]'
			>
				{title}
			</Text>
			<Text
				variant={'secondary-bold'}
				level={'h3'}
				className='text-right text-black'
			>
				{quantity}
			</Text>
		</div>
	)
}
