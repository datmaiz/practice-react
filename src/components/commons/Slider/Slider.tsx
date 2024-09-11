import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons/outlined'
import { FC, useRef } from 'react'
import { Loader, ProductCard } from '..'
import { useGetProducts } from '@/hooks/useGetProducts'

export const Slider: FC = () => {
	const { data: products, isLoading } = useGetProducts()
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

	return (
		<div className='relative'>
			<ChevronLeftIcon
				onClick={scrollLeft}
				width={43}
				className='absolute top-1/2 right-full -translate-y-1/2 cursor-pointer z-[1] hidden md:block'
			/>
			<div
				ref={ref}
				className='flex gap-6 overflow-x-auto overflow-y-hidden snap-x scroll-hidden'
			>
				{products?.map(product => (
					<ProductCard
						key={product.productId}
						product={product}
						isColorsShown
						custom='shrink-0 basis-[100px] md:basis-[200px] snap-start'
					/>
				))}
				{isLoading && (
					<div className='justify-self-center flex-center w-full text-primary'>
						<Loader size={'2xl'} />
					</div>
				)}
			</div>
			<ChevronRightIcon
				onClick={scrollRight}
				width={43}
				className='absolute top-1/2 left-full -translate-y-1/2 cursor-pointer z-[1] hidden md:block'
			/>
		</div>
	)
}
