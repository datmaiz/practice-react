import { IBreadcrumb } from '@/common/interfaces'
import { Breadcrumb, ClientContainer, Loader, Slider } from '@/components/commons'
import { Text } from '@/components/elements'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ProductImages } from './ProductImages'
import { ProductOptions } from './ProductOptions'
import { ProductDetail } from './ProductDetails'
import { useGetProductById } from '@/hooks/useGetProducts'

const ProductDetailsPage = () => {
	const { productId } = useParams<{ productId: string }>()
	const { data: product, isLoading } = useGetProductById(productId!)
	const breadcrumbs: IBreadcrumb[] = useMemo(() => {
		return [
			{
				path: '/',
				title: 'homepage',
			},
			{
				path: `/products/${productId}`,
				title: product?.name ?? '',
			},
		]
	}, [product])

	return isLoading ? (
		<ClientContainer className='relative h-dvh'>
			<div className='absolute inset-0 flex-center text-primary'>
				<Loader size={'3xl'} />
			</div>
		</ClientContainer>
	) : product ? (
		<ClientContainer>
			<section className='flex-center py-[43px]'>
				<Breadcrumb breadcrumbs={breadcrumbs} />
			</section>

			<section className='flex flex-wrap-reverse text-black-600'>
				<div className='flex-[2] md:flex-col-reverse border-r pr-3 pt-10'>
					<ProductImages images={product.images} />
					<ProductDetail product={product} />
				</div>
				<ProductOptions product={product} />
			</section>

			<section className='pb-[116px]'>
				<Text
					level={'h4'}
					className='pt-[120px] pb-10'
					variant={'primary-regular'}
				>
					Also You May Like
				</Text>
				<Slider />
			</section>
		</ClientContainer>
	) : (
		<Text className='text-center'>Not found product</Text>
	)
}

export default ProductDetailsPage
