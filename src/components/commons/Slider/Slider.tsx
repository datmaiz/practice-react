import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons/outlined'
import { IProduct } from '@/common/interfaces'
import { FC, useEffect, useRef, useState } from 'react'
import { ProductCard } from '..'
import { getProducts } from '@/services'

export const Slider: FC = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const ref = useRef<HTMLDivElement>(null)

	const scrollLeft = () => {
		ref?.current?.scrollBy({
			left: ref.current.clientWidth * -1,
			behavior: 'smooth',
		})
	}

	const scrollRight = () => {
		ref?.current?.scrollBy({
			left: ref.current.clientWidth,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		;(async () => {
			const response = await getProducts()
			if ('data' in response) {
				setProducts(response.data)
			}
		})()
	}, [])

	return (
		<div className='relative'>
			<ChevronLeftIcon
				onClick={scrollLeft}
				width={43}
				className='absolute top-1/2 right-full -translate-y-1/2 cursor-pointer z-[1] hidden md:block'
			/>
			<div
				ref={ref}
				className='flex gap-6 overflow-x-auto overflow-y-hidden snap-x'
			>
				{products.map(product => (
					<ProductCard
						key={product.productId}
						product={product}
						isColorsShown
						custom='shrink-0 basis-[100px] md:basis-[200px] snap-start'
					/>
				))}
			</div>
			<ChevronRightIcon
				onClick={scrollRight}
				width={43}
				className='absolute top-1/2 left-full -translate-y-1/2 cursor-pointer z-[1] hidden md:block'
			/>
		</div>
	)
}
