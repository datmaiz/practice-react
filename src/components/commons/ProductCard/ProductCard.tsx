import { FC } from 'react'
import { VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'

import { IProduct } from '@/common/interfaces'
import { productCardVariants } from './product-card-variants'
import cn from '@/utils/cn'
import { Image, Text } from '@/components/elements'
import { BagIcon, HeartIcon, StarIcon } from '@/assets/icons/outlined'
import { numberToCurrency } from '@/utils'

interface ProductCardProps extends VariantProps<typeof productCardVariants> {
	product: IProduct
	custom?: string
	isColorsShown?: boolean
}

export const ProductCard: FC<ProductCardProps> = ({
	product,
	custom,
	isColorsShown = false,
	direction = 'vertical',
}) => {
	return (
		<article className={cn(productCardVariants({ direction }), custom)}>
			<div className='relative group h-full'>
				<Image
					src={product.images[0]}
					alt={product.name}
					containerClassName={`${direction === 'horizontal' ? 'aspect-[2/3]' : 'aspect-[3/4]'} size-full`}
				/>
				{direction === 'vertical' && !isColorsShown && (
					<div className='absolute w-[80%] top-1/2 left-1/2 -translate-x-1/2 flex py-4 rounded-full opacity-0 justify-center bg-white shadow-lg duration-300 translate-y-full group-hover:-translate-y-1/2 group-hover:opacity-100'>
						<BagIcon
							width={25}
							className='duration-300 text-gray-500 hover:text-black-600'
						/>
						<hr className='mx-[17px] duration-300 bg-gray-700 hover:bg-black h-auto px-[1px]' />
						<HeartIcon
							width={25}
							className='duration-300 text-gray-500 hover:text-black-600'
						/>
					</div>
				)}
			</div>
			<div className={`flex flex-col max-w-full`}>
				<Text
					level={'h6'}
					className={`${direction === 'vertical' ? 'line-clamp-1' : 'line-clamp-3'} pt-[32px] break-all`}
				>
					<Link to={`/products/${product.productId}`}>{product.name}</Link>
				</Text>
				{isColorsShown ? (
					<div className='flex pt-3 gap-1'>
						{product.colors.map(color => (
							<span
								key={color}
								style={{ backgroundColor: color }}
								className='block w-[10px] aspect-square rounded-full'
							></span>
						))}
					</div>
				) : (
					<div className='flex pt-[13px]'>
						{Array(4)
							.fill(0)
							.map((_, index) => (
								<StarIcon
									width={18}
									height={18}
									key={index}
									className='text-primary'
								/>
							))}
						<StarIcon
							width={18}
							height={18}
							className='text-gray-500'
						/>
					</div>
				)}
				<Text className='pt-5 text-base sm:text-base md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[24px]'>
					{numberToCurrency(product.price)}
				</Text>
			</div>
		</article>
	)
}
