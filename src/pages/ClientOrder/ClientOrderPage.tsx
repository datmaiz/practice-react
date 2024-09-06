import { IBreadcrumb } from '@/common/interfaces'
import { Breadcrumb, ClientContainer, Loader, Slider } from '@/components/commons'
import { Text } from '@/components/elements'
import { OrdersList } from './OrdersList'
import { useAuth, useGetOrdersWithUserByUserId } from '@/hooks'

const ClientOrderPage = () => {
	const { auth } = useAuth()
	const { isLoading } = useGetOrdersWithUserByUserId(auth!.id)
	const breadcrumbs: IBreadcrumb[] = [
		{ path: '/', title: 'homepage' },
		{ path: '/orders', title: 'all orders' },
	]

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
				{isLoading ? (
					<div className='flex-center h-20 text-primary'>
						<Loader size={'2xl'} />
					</div>
				) : (
					<OrdersList />
				)}
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
