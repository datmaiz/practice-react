import { IBreadcrumb } from '@/common/interfaces'
import { Breadcrumb, ClientContainer, Slider } from '@/components/commons'
import { Text } from '@/components/elements'
import { BagsList } from './BagsList'

const BagPage = () => {
	const breadcrumbs: IBreadcrumb[] = [
		{ path: '/', title: 'homepage' },
		{ path: '/bags', title: 'shopping bag' },
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
				SHOPPING BAG
			</Text>
			<section className='flex justify-between gap-[62px] *:flex-1'>
				<BagsList />
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
