import { BedsheetBanner, SaleBanner } from './Banner'
import { ProductIntroduce } from './ProductIntroduce'
import { Services } from './Service'
import { Subscribe } from './Subscribe'
import { IntroductionProducts } from './IntroductionProducts'
import { TopRatingProducts } from './TopRatingProducts'
import { useGetProducts } from '@/hooks/useGetProducts'
import { Loader } from '@/components/commons'
import { shuffleArray } from '@/utils'

const HomePage = () => {
	const { data: products, isLoading } = useGetProducts()

	return (
		<div>
			<Services />
			<SaleBanner />
			<ProductIntroduce />
			{isLoading ? (
				<div className='h-20 w-full flex-center text-primary'>
					<Loader size={'3xl'} />
				</div>
			) : (
				<IntroductionProducts products={shuffleArray(products ?? [])} />
			)}
			<BedsheetBanner />
			{isLoading ? (
				<div className='h-20 w-full flex-center text-primary'>
					<Loader size={'3xl'} />
				</div>
			) : (
				<TopRatingProducts products={shuffleArray(products ?? [])} />
			)}
			<Subscribe />
		</div>
	)
}

export default HomePage
