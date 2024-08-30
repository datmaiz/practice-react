import { IBreadcrumb, IOrder } from '@/common/interfaces'
import { Breadcrumb, ClientContainer, Slider } from '@/components/commons'
import { Text } from '@/components/elements'
import { deleteOrderById, getOrdersByUserId } from '@/services'
import { useEffect, useState } from 'react'
import { OrdersList } from './OrdersList'
import { toast } from 'react-toastify'

const ClientOrderPage = () => {
	const [orders, setOrders] = useState<IOrder[]>([])
	const breadcrumbs: IBreadcrumb[] = [
		{ path: '/', title: 'homepage' },
		{ path: '/orders', title: 'all orders' },
	]

	const handleCancelOrder = async (orderId: string) => {
		const response = await deleteOrderById(orderId)
		if ('data' in response) {
			toast.success(response.message)
			setOrders(orders.filter(order => order.id !== orderId))
		} else {
			toast.error(response.error)
		}
	}

	useEffect(() => {
		;(async () => {
			const response = await getOrdersByUserId('12ddqwqh')
			if ('data' in response) {
				setOrders(response.data)
			}
		})()
	}, [])

	return (
		<ClientContainer>
			<section className='flex-center py-[44px]'>
				<Breadcrumb breadcrumbs={breadcrumbs} />
			</section>
			<Text
				level={'h2'}
				className='text-center pb-[60px]'
			>
				ALL ORDERS
			</Text>
			<section className='flex justify-between gap-[62px] *:flex-1'>
				{orders.length > 0 ? (
					<OrdersList
						onCancelOrder={handleCancelOrder}
						orders={orders}
					/>
				) : (
					<Text
						level={'h5'}
						className='text-center'
					>
						Have no order
					</Text>
				)}
				{/* <BagOrderPanel /> */}
			</section>
			<section className='py-[120px]'>
				<Text
					level={'h4'}
					className='pb-10'
				>
					Also You May Buy
				</Text>
				<Slider />
			</section>
		</ClientContainer>
	)
}

export default ClientOrderPage
