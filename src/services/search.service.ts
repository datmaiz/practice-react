import { IErrorResponse, IProduct, ISuccessResponse } from '@/common/interfaces'
import { axiosClient } from '@/utils'

export const searchProducts = async (query: string): Promise<ISuccessResponse<IProduct[]> | IErrorResponse> => {
	try {
		const response = await axiosClient.get<IProduct[]>(`/products?name_like=${query}`)
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
