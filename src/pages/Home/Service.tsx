import { HeadPhoneIcon, MoneyBackIcon, TruckIcon } from '@/assets/icons/outlined'
import { Text } from '@/components/elements'

export const Services = () => {
	return (
		<section className='flex-ver justify-around pt-10 pb-4 text-black-600/50'>
			<div className='flex flex-ver gap-4'>
				<TruckIcon width={30} />
				<Text level={'h8'}>FREE SHIPPING</Text>
			</div>
			<div className='flex flex-ver gap-4'>
				<MoneyBackIcon width={30} />
				<Text level={'h8'}>100% MONEY BACK</Text>
			</div>
			<div className='flex flex-ver gap-4'>
				<HeadPhoneIcon width={30} />
				<Text level={'h8'}>SUPPORT 24/7</Text>
			</div>
		</section>
	)
}
