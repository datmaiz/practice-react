import { IProduct } from '@/common/interfaces'
import { Text } from '@/components/elements'

interface ProductDetailsProps {
	product: IProduct
}

export const ProductDetail = ({ product }: ProductDetailsProps) => {
	return (
		<section className='py-[57px] px-[78px] text-black-600 bg-gray-400/30'>
			<Text
				level={'h7'}
				variant={'primary-light'}
				className='text-[#DA0909]'
			>
				Conscious
			</Text>
			<Text
				variant={'primary-regular'}
				level={'h6'}
				className='pt-4'
			>
				{product.descriptions}
			</Text>
			<Text
				variant={'primary-light'}
				level={'h6'}
				className='pt-8'
			>
				Composition - <span className='text-black-600/50'>Cotton 50%, Lyocell 50%</span>
			</Text>
			<Text
				variant={'primary-light'}
				level={'h6'}
				className='pt-2'
			>
				Art. No. — <span className='text-black-600/50'>0643448004</span>
			</Text>
		</section>
	)
}
