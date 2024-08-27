import { useEffect, useState } from 'react'
import { BedsheetBanner, SaleBanner } from './Banner'
import { ProductIntroduce } from './ProductIntroduce'
import { Services } from './Service'
import { Subscribe } from './Subscribe'
import { IProduct } from '@/common/interfaces'
import { getProducts } from '@/services'
import { toast } from 'react-toastify'
import { IntroductionProducts } from './IntroductionProducts'
import { TopRatingProducts } from './TopRatingProducts'

const HomePage = () => {
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		;(async () => {
			const response = await getProducts()
			if ('data' in response) {
				setProducts(response.data)
			} else {
				toast.error('Can not get data')
			}
		})()
	}, [])

	return (
		<div>
			<Services />
			<SaleBanner />
			<ProductIntroduce />
			<IntroductionProducts products={products} />
			<BedsheetBanner />
			<TopRatingProducts products={products} />
			<Subscribe />
		</div>
	)
}

export default HomePage
