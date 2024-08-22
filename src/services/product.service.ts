import { IErrorResponse, IProduct, ISuccessResponse } from '@/common/interfaces'
import { axiosClient } from '@/utils/axiosClient'
import { uploadImages } from '.'
import { randomId } from '@/utils'

export const getProducts = async (): Promise<ISuccessResponse<IProduct[]> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.get<IProduct[]>('/products')
		return {
			message: '',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const getProductById = async (
	productId: string
): Promise<ISuccessResponse<IProduct> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.get<IProduct[]>('/products', { params: { id: productId } })
		if (!response.data.length) {
			return {
				error: 'Product is not exist',
			}
		}

		return {
			message: '',
			data: response.data[0],
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const createProduct = async (
	product: Partial<IProduct>,
	files: File[]
): Promise<ISuccessResponse<IProduct> | IErrorResponse<string>> => {
	try {
		const uploads = await uploadImages(files)
		const imageUrls = uploads.map(upload => upload.secure_url)
		const response = await axiosClient.post('/products', { ...product, images: imageUrls, id: randomId() })
		return {
			message: 'Create product successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const updateProduct = async (
	product: IProduct,
	files: File[]
): Promise<ISuccessResponse<IProduct> | IErrorResponse<string>> => {
	try {
		const uploads = await uploadImages(files)
		const imageUrls = uploads.map(upload => upload.secure_url)
		const repsonse = await axiosClient.patch<IProduct>(`/products/${product.id}`, {
			...product,
			images: [...product.images, ...imageUrls],
		})
		return {
			message: 'Update product successfully',
			data: repsonse.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const deleteProduct = async (
	productId: string
): Promise<ISuccessResponse<IProduct> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.delete<IProduct>(`/products/${productId}`)
		return {
			message: 'Delete product successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
