import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { IOrder } from '@/common/interfaces'
import cn from '@/utils/cn'
import { Loader } from '..'

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	status: IOrder['status']
	isLoading?: boolean
	children: ReactNode
}

export const StatusButton: FC<StatusButtonProps> = ({ status, className, isLoading = false, children, ...others }) => {
	const statusColor = status === 'waiting' ? 'text-gray-600' : status === 'rejected' ? 'text-red-500' : 'text-green-500'

	return (
		<button
			type='button'
			className={cn(
				`uppercase px-6 py-4 ${statusColor} border border-current relative before:absolute before:inset-0 before:bg-current before:-z-[2] before:opacity-30 inline-flex gap-2 ${
					isLoading ? 'text-gray-500' : ''
				}`,
				className
			)}
			disabled={isLoading}
			{...others}
		>
			{isLoading && <Loader size={'sm'} />}
			{children}
		</button>
	)
}
