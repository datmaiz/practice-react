import { IErrorResponse, IOrder, IOrderRequest, ISuccessResponse, IUserResponse } from '@/common/interfaces'
import { axiosClient, randomId } from '@/utils'
import { IOrderResponseWithUser } from '../common/interfaces/IOrder'

export const createOrder = async (
	order: IOrderRequest
): Promise<ISuccessResponse<IOrderRequest> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.post<IOrder>('/orders', { ...order, id: randomId() })
		return {
			message: 'Ordered successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const getOrdersWithAllUsers = async (): Promise<
	ISuccessResponse<IOrderResponseWithUser[]> | IErrorResponse<string>
> => {
	try {
		const ordersResponse = await axiosClient.get<IOrder[]>('/orders')
		const usersResponse = await axiosClient.get<IUserResponse[]>('/users', { params: { role: 'user' } })
		const orders = ordersResponse.data
		const users = usersResponse.data
		const data: IOrderResponseWithUser[] = orders.map(order => ({
			...order,
			user: users.find(each => each.id === order.userId)!,
		}))
		return {
			message: '',
			data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const getOrdersByUserId = async (
	userId: string
): Promise<ISuccessResponse<IOrder[]> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.get<IOrder[]>('/orders', { params: { userId } })
		return {
			message: 'Ordered successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const changeStatus = async (
	orderId: string,
	status: IOrder['status']
): Promise<ISuccessResponse<IOrder> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.patch<IOrder>(`/orders/${orderId}`, { status })
		return {
			message: 'Changed status successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const deleteOrderById = async (
	orderId: string
): Promise<ISuccessResponse<IOrder[]> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.delete<IOrder[]>(`/orders/${orderId}`)
		return {
			message: 'Delete order successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
