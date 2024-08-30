import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { IOrder } from '@/common/interfaces'
import cn from '@/utils/cn'

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	status: IOrder['status']
	children: ReactNode
}

export const StatusButton: FC<StatusButtonProps> = ({ status, className, children, ...others }) => {
	const statusColor = status === 'waiting' ? 'text-gray-600' : status === 'rejected' ? 'text-red-500' : 'text-green-500'

	return (
		<button
			type='button'
			className={cn(
				`uppercase px-6 py-4 ${statusColor} border border-current relative before:absolute before:inset-0 before:bg-current before:-z-[2] before:opacity-30`,
				className
			)}
			{...others}
		>
			{children}
		</button>
	)
}
