import { BagIcon, OrderIcon, PersonIcon } from '@/assets/icons/outlined'
import { Loader } from '@/components/commons'
import { OverviewCard } from '@/components/commons/OverviewCard/OverviewCard'
import { useGetOrdersWithAllUsers } from '@/hooks/useGetOrders'
import { useGetProducts } from '@/hooks/useGetProducts'
import { useGetUsers } from '@/hooks/useGetUsers'
import { FC } from 'react'

const DashboardPage: FC = () => {
	const { data: users, isLoading: isUsersLoading } = useGetUsers()
	const { data: products, isLoading: isProductsLoading } = useGetProducts()
	const { data: orders, isLoading: isOrdersLoading } = useGetOrdersWithAllUsers()

	return (
		<div className='w-full flex-1 pt-4 relative'>
			{isUsersLoading || isProductsLoading || isOrdersLoading ? (
				<div className='absolute inset-0 flex-center text-secondary h-dvh'>
					<Loader size={'2xl'} />
				</div>
			) : (
				<div className='flex gap-[30px]'>
					<OverviewCard
						icon={<PersonIcon width={48} />}
						title='Users'
						quantity={users?.length ?? 0}
						className='text-blue-500'
					/>
					<OverviewCard
						icon={<BagIcon width={48} />}
						title='Products'
						quantity={products?.length ?? 0}
						className='text-red-500'
					/>
					<OverviewCard
						icon={<OrderIcon width={48} />}
						title='Orders'
						quantity={orders?.length ?? 0}
						className='text-green-500'
					/>
				</div>
			)}
		</div>
	)
}

export default DashboardPage
