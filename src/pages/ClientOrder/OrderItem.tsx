import { IOrder } from '@/common/interfaces'
import { StatusButton } from '@/components/commons'
import { Button, Image, Text } from '@/components/elements'
import { numberToCurrency } from '@/utils'
import { FC } from 'react'

interface OrderItemProps {
	order: IOrder
	onCancelOrder: (orderId: string) => void
}

export const OrderItem: FC<OrderItemProps> = ({ order, onCancelOrder }) => {
	return (
		<div className='flex gap-5 p-4 border rounded-lg'>
			<Image
				src={order.thumb}
				alt={order.name}
				containerClassName='max-w-[150px] aspect-[2/3] border'
			/>
			<div className='flex flex-col flex-1 justify-between'>
				<div className='flex flex-col'>
					<Text
						variant={'primary-regular'}
						level={'h7'}
					>
						{order.name}
					</Text>
					<Text
						variant={'primary-regular'}
						level={'h6'}
						className='pt-4'
					>
						{numberToCurrency(order.price)}
					</Text>
				</div>
				<div className='flex-ver justify-between'>
					<div className='flex gap-[46px]'>
						<div className='flex gap-[18px]'>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Quantity:
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Color:
								</Text>
							</div>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{order.quantity}
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{order.color}
								</Text>
							</div>
						</div>
						<div className='flex gap-[18px]'>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Size:
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Total:
								</Text>
							</div>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{order.size}
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{numberToCurrency(order.quantity * order.price)}
								</Text>
							</div>
						</div>
					</div>
					<div className='flex-ver gap-4'>
						<Button
							disabled={order.status !== 'waiting'}
							onClick={() => onCancelOrder(order.id)}
							className={`px-6 py-4 ${order.status !== 'waiting' ? 'bg-gray-500' : ''}`}
						>
							Cancel
						</Button>
						<StatusButton status={order.status}>{order.status}</StatusButton>
					</div>
				</div>
			</div>
		</div>
	)
}
