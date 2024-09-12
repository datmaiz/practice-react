import { IProduct } from '@/common/interfaces'
import { axiosClient } from '@/utils/axiosClient'
import { uploadImages } from '.'
import { randomId } from '@/utils'

export const getProducts = async () => {
	return (await axiosClient.get<IProduct[]>('/products')).data
}

export const getProductById = async (productId: string) => {
	return (await axiosClient.get<IProduct[]>('/products', { params: { productId } })).data[0]
}

export const createProduct = async (product: Partial<IProduct>, files: File[]) => {
	const uploads = await uploadImages(files)
	const imageUrls = uploads.map(upload => upload.secure_url)

	const id = randomId()
	console.log(id)

	return (
		await axiosClient.post('/products', {
			...product,
			images: imageUrls,
			id,
			productId: id,
		})
	).data
}

export const updateProduct = async (product: IProduct, files: File[]) => {
	const uploads = await uploadImages(files)
	const imageUrls = uploads.map(upload => upload.secure_url)
	return (
		await axiosClient.patch<IProduct>(`/products/${product.productId}`, {
			...product,
			images: [...product.images, ...imageUrls],
		})
	).data
}

export const deleteProduct = async (productId: string) => {
	return (await axiosClient.delete<IProduct>(`/products/${productId}`)).data
}
