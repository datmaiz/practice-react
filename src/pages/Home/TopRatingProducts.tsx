import { IProduct } from '@/common/interfaces'
import { ClientContainer, ProductCard } from '@/components/commons'
import { Text } from '@/components/elements'
import { FC } from 'react'

interface TopRatingProductsProps {
	products: IProduct[]
}

export const TopRatingProducts: FC<TopRatingProductsProps> = ({ products }) => {
	return (
		<ClientContainer>
			<section className='pt-[84px]'>
				<Text level={'h2'}>TOP RATING</Text>
				<div className='grid grid-cols-3 gap-6 pt-[50px]'>
					{products.map(product => (
						<ProductCard
							key={product.productId}
							direction={'horizontal'}
							product={product}
							custom='max-w-[350px]'
						/>
					))}
				</div>
			</section>
		</ClientContainer>
	)
}
