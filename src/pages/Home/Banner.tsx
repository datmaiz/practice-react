import { BedsheetSet, HomeBanner } from '@/assets/images'
import { Button, Text } from '@/components/elements'

export const SaleBanner = () => {
	return (
		<section className='bg-white-linen-100 flex items-center gap-[66px] py-[62px] px-[72px]'>
			<figure className='max-w-[594px]'>
				<img
					src={HomeBanner}
					alt=''
				/>
			</figure>
			<div>
				<Text
					level={'h4'}
					className='pb-6'
				>
					HOT DEALS THIS WEEK
				</Text>
				<Text className='text-[#A86A3D] text-balance max-w-[465px] pb-10'>SALE UP 50% MODERN FURNITURE</Text>
				<Button
					styleType={'outlined'}
					className='p-4 text-sm'
				>
					view now
				</Button>
			</div>
		</section>
	)
}

export const BedsheetBanner = () => {
	return (
		<section className='relative flex-ver'>
			<img
				src={BedsheetSet}
				alt='bedsheet sets'
			/>
			<div className='py-[61px] px-[130px] bg-white absolute top-1/2 left-[147px] -translate-y-1/2 max-w-[545px]'>
				<Text
					level={'h3'}
					className='pb-4'
				>
					BEDSHEET SETS
				</Text>
				<div className='flex-ver gap-6 text-[#A86A3D] pb-4'>
					<Text level={'h3'}>$50.00</Text>
					<Text
						level={'h7'}
						className='line-through'
					>
						$220.00
					</Text>
				</div>
				<p className='text-black-600 pb-4'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
				</p>
				<Button
					styleType={'outlined'}
					className='p-4 text-sm'
				>
					view details
				</Button>
			</div>
		</section>
	)
}
