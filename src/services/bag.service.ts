import { IErrorResponse, ISuccessResponse } from '@/common/interfaces'
import { IBag, IBagRequest } from '@/common/interfaces'
import { axiosClient, randomId } from '@/utils'

export const createBag = async (bag: IBagRequest): Promise<ISuccessResponse<IBag> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.post<IBag>('/bags', { ...bag, id: randomId() })
		return {
			message: 'Add to bag successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const getBagsByUserId = async (userId: string): Promise<ISuccessResponse<IBag[]> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.get<IBag[]>('/bags', { data: { id: userId } })
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

export const deleteBagById = async (bagId: string): Promise<ISuccessResponse<IBag> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.delete<IBag>(`/bags/${bagId}`)
		console.log(response.data)
		return {
			message: 'Deleted bag successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
