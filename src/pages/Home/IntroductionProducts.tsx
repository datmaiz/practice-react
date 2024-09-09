import { IProduct } from '@/common/interfaces'
import { ClientContainer, ProductCard } from '@/components/commons'
import { FC } from 'react'

interface IntroductionProductProps {
	products: IProduct[]
}

export const IntroductionProducts: FC<IntroductionProductProps> = ({ products }) => {
	return (
		<ClientContainer>
			<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-[57px] pb-[113px]'>
				{products.map(product => (
					<ProductCard
						key={product.productId}
						isColorsShown={false}
						product={product}
					/>
				))}
			</section>
		</ClientContainer>
	)
}
