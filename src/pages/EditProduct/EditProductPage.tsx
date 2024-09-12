import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { IProduct } from '@/common/interfaces'
import { Loader } from '@/components/commons'
import { Text } from '@/components/elements'
import { useGetProductById } from '@/hooks'
import { useUpdateProductMuatation } from '@/hooks/useProductMutation'
import { TImagePreview } from '../ProductManagerment/AddProductModal'
import { BaseInformation } from './BaseInformation'
import { MediaInformation } from './MediaInformation'
import { MoreInformation } from './MoreInformation'

const schema = z.object({
	name: z.string().min(1, 'Name can not be empty'),
	price: z.number({ message: 'Price must be a number' }).min(0, 'Price must be greater than or equal 0'),
	descriptions: z.string(),
})

export type DataForm = z.infer<typeof schema>
const initialImagePreview: TImagePreview = {
	urls: [],
	files: [],
}

const EditProductPage = () => {
	const { productId } = useParams<{ productId: string }>()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<DataForm>({
		resolver: zodResolver(schema),
	})
	const [preview, setPreview] = useState<TImagePreview>(initialImagePreview)
	const [product, setProduct] = useState<IProduct>()
	const { data, isLoading } = useGetProductById(productId!)
	const [searchParams] = useSearchParams()
	const updateProductMutation = useUpdateProductMuatation(+(searchParams.get('page') ?? 1))

	const handleSubmitForm = async (data: DataForm) => {
		if (!product) return
		const { name, descriptions, price } = data
		const newProduct: IProduct = { ...product, name, descriptions, price }
		await updateProductMutation.mutateAsync(
			{ product: newProduct, files: preview.files },
			{
				onSuccess: () => toast.success('Update successfully'),
			}
		)
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const filesList = e.target.files
		if (filesList) {
			const files: File[] = [...preview.files]
			const urls: string[] = [...preview.urls]
			for (const file of filesList) {
				files.push(file)
				urls.push(URL.createObjectURL(file))
			}
			setPreview({ files, urls })
		}
	}

	const handleDeleteImagePreview = (image: string) => {
		const indexOfUrl = preview.urls.indexOf(image)
		if (indexOfUrl !== -1) {
			const newFiles = preview.files.filter((_, index) => index !== indexOfUrl)
			const newUrls = preview.urls.filter((_, index) => index !== indexOfUrl)
			URL.revokeObjectURL(preview.urls[indexOfUrl])
			setPreview({ files: newFiles, urls: newUrls })
			return
		}
		if (!product) return

		const newImages = product.images.filter(item => image != item)
		setProduct({ ...product, images: newImages })
	}
	useEffect(() => {
		if (data) {
			setProduct(data)
			reset(data)
		}
	}, [data])

	return isLoading ? (
		<div className='flex-center h-20 text-secondary'>
			<Loader size={'2xl'} />
		</div>
	) : product ? (
		<div>
			<form
				className='grid grid-cols-2 items-start gap-4 pt-8 *:flex *:flex-1 *:flex-col *:gap-4'
				onSubmit={handleSubmit(handleSubmitForm)}
			>
				<div>
					<BaseInformation
						register={register}
						errors={errors}
					/>
					<MediaInformation
						images={preview.urls}
						onDeleteImage={handleDeleteImagePreview}
						onInputChange={handleFileChange}
						product={product}
					/>
				</div>
				<MoreInformation
					isSubmitting={isSubmitting}
					setProduct={setProduct}
					product={product}
				/>
			</form>
		</div>
	) : (
		<Text className='w-full text-center'>Not found this product</Text>
	)
}

export default EditProductPage
