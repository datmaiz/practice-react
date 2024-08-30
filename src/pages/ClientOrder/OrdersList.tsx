import { IOrder } from '@/common/interfaces'
import { FC } from 'react'
import { OrderItem } from './OrderItem'

interface OrdersListProps {
	orders: IOrder[]
	onCancelOrder: (orderId: string) => void
}

export const OrdersList: FC<OrdersListProps> = ({ orders, onCancelOrder }) => {
	return (
		<div>
			{orders.map(order => (
				<OrderItem
					key={order.id}
					onCancelOrder={onCancelOrder}
					order={order}
				/>
			))}
		</div>
	)
}
