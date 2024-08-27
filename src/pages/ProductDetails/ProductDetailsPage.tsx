import { IBreadcrumb, IProduct } from '@/common/interfaces'
import { Breadcrumb, ClientContainer, Slider } from '@/components/commons'
import { Text } from '@/components/elements'
import { getProductById } from '@/services'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductImages } from './ProductImages'
import { ProductOptions } from './ProductOptions'
import { ProductDetail } from './ProductDetails'

const ProductDetailsPage = () => {
	const { productId } = useParams<{ productId: string }>()
	const [product, setProduct] = useState<IProduct>()
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

	useEffect(() => {
		console.log('changed', productId)
		;(async () => {
			if (!productId) return
			const response = await getProductById(productId)
			if ('data' in response) {
				setProduct(response.data)
			}
		})()
	}, [productId])

	return product ? (
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
