import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { IBag, IBreadcrumb, IOrderRequest } from '@/common/interfaces'
import { Breadcrumb, ClientContainer, Slider } from '@/components/commons'
import { Text } from '@/components/elements'
import { createOrder } from '@/services'
import { deleteBagById, getBagsByUserId } from '@/services/bag.service'
import { BagsList } from './BagsList'

const BagPage = () => {
	const [bags, setBags] = useState<IBag[]>([])
	const breadcrumbs: IBreadcrumb[] = [
		{ path: '/', title: 'homepage' },
		{ path: '/bags', title: 'shopping bag' },
	]

	const handleOrderClick = async (bag: IBag) => {
		const order: IOrderRequest = {
			...bag,
			status: 'waiting',
			orderedAt: Date.now(),
		}
		await deleteBagById(bag.id)
		const response = await createOrder(order)
		if ('data' in response) {
			toast.success(response.message)
			setBags(bags.filter(each => each.id !== bag.id))
		} else {
			toast.error(response.error)
		}
	}

	const handleDeleteBag = async (bagId: string) => {
		const response = await deleteBagById(bagId)
		if ('data' in response) {
			toast.success(response.message)
			setBags(bags.filter(each => each.id !== bagId))
		} else {
			toast.error(response.error)
		}
	}

	useEffect(() => {
		;(async () => {
			const response = await getBagsByUserId('12ddqwqh')
			if ('data' in response) {
				setBags(response.data)
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
				SHOPPING BAG
			</Text>
			<section className='flex justify-between gap-[62px] *:flex-1'>
				{bags.length > 0 ? (
					<BagsList
						onOrder={handleOrderClick}
						onDelete={handleDeleteBag}
						bags={bags}
					/>
				) : (
					<Text
						level={'h5'}
						className='text-center'
					>
						Have no product in your bag
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

export default BagPage
