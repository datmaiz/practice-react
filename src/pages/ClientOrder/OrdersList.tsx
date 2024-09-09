import { Text } from '@/components/elements'
import { OrderItem } from './OrderItem'
import { useAuth, useGetOrdersWithUserByUserId } from '@/hooks'

export const OrdersList = () => {
	const { auth } = useAuth()
	const { data: orders = [] } = useGetOrdersWithUserByUserId(auth!.id)

	return (
		<div>
			{orders.length > 0 ? (
				orders.map(order => (
					<OrderItem
						key={order.id}
						order={order}
					/>
				))
			) : (
				<Text
					level={'h5'}
					className='text-center'
				>
					Have no order
				</Text>
			)}
		</div>
	)
}
