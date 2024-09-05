import { Text } from '@/components/elements'
import { OrderTable } from './OrderTable'

const OrderManagermentPage = () => {
	return (
		<div className='flex-1'>
			<Text
				variant={'secondary-bold'}
				level={'h4'}
				className='py-3 border-b border-gray-500'
			>
				Orders List
			</Text>
			<section className='overflow-x-auto p-0'>
				<OrderTable />
			</section>
		</div>
	)
}

export default OrderManagermentPage
