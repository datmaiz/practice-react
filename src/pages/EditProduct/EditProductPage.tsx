import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { IProduct } from '@/common/interfaces'
import { getProductById, updateProduct } from '@/services'
import { BaseInformation } from './BaseInformation'
import { MoreInformation } from './MoreInformation'
import { Text } from '@/components/elements'
import { MediaInformation } from './MediaInformation'
import { TImagePreview } from '../ProductManagerment/AddProductModal'
import { toast } from 'react-toastify'

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
	const [product, setProduct] = useState<IProduct>()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<DataForm>({
		resolver: zodResolver(schema),
	})
	const [preview, setPreview] = useState<TImagePreview>(initialImagePreview)
	const navigate = useNavigate()

	const handleSubmitForm = async (data: DataForm) => {
		if (!product) return
		const { name, descriptions, price } = data
		const newProduct: IProduct = { ...product, name, descriptions, price }
		const response = await updateProduct(newProduct, preview.files)
		if ('data' in response) {
			toast.success(response.message)
			navigate('/admin/product', { replace: true })
		} else {
			toast.error(response.error)
		}
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
		;(async () => {
			if (!productId) return
			const response = await getProductById(productId)
			if ('data' in response) {
				setProduct(response.data)
				reset(response.data)
			}
		})()
	}, [productId])

	return product ? (
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
					setProduct={setProduct}
					isSubmitting={isSubmitting}
					product={product}
				/>
			</form>
		</div>
	) : (
		<Text className='w-full text-center'>Not found this product</Text>
	)
}

export default EditProductPage
