import { IOrder, IOrderRequest, IPagination, IUserResponse } from '@/common/interfaces'
import { axiosClient, randomId } from '@/utils'
import { IOrderResponseWithUser } from '../common/interfaces/IOrder'

export const createOrder = async (order: IOrderRequest) => {
	return (await axiosClient.post<IOrder>('/orders', { ...order, id: randomId() })).data
}

export const getOrdersWithAllUsers = async () => {
	const [ordersResponse, usersResponse] = await Promise.all([
		await axiosClient.get<IOrder[]>('/orders'),
		await axiosClient.get<IUserResponse[]>('/users', { params: { role: 'user' } }),
	])

	const orders = ordersResponse.data
	const users = usersResponse.data

	const data: IOrderResponseWithUser[] = orders.map(order => ({
		...order,
		user: users.find(user => user.id === order.userId)!,
	}))

	return data
}

export const getOrdersWithAllUsersPerPage = async (
	paginationProps: Omit<IPagination<IOrderResponseWithUser[]>['pagination'], '_totalRows'>
) => {
	const [ordersResponse, usersResponse] = await Promise.all([
		await axiosClient.get<IPagination<IOrder[]>>('/orders', { params: paginationProps }),
		await axiosClient.get<IUserResponse[]>('/users', { params: { role: 'user' } }),
	])

	const orders = ordersResponse.data
	const users = usersResponse.data

	orders.data = orders.data.map(order => ({
		...order,
		user: users.find(user => user.id === order.userId)!,
	}))

	const ordersWithUser: IPagination<IOrderResponseWithUser[]> = {
		data: orders.data.map(order => ({
			...order,
			user: users.find(user => user.id === order.userId)!,
		})),
		pagination: orders.pagination,
	}

	return ordersWithUser
}

export const getOrdersWithAllUsersByUserId = async (userId: string) => {
	const [ordersResponse, usersResponse] = await Promise.all([
		await axiosClient.get<IOrder[]>('/orders', { params: { userId } }),
		await axiosClient.get<IUserResponse[]>('/users', { params: { role: 'user', userId } }),
	])

	const orders = ordersResponse.data
	const users = usersResponse.data

	const data: IOrderResponseWithUser[] = orders.map(order => ({
		...order,
		user: users.find(user => user.id === order.userId)!,
	}))

	return data
}

export const getAllOrders = async () => {
	return (await axiosClient.get<IOrder[]>('/orders')).data
}

export const getOrdersByUserId = async (userId: string) => {
	return (await axiosClient.get<IOrder[]>('/orders', { params: { userId } })).data
}

export const changeStatus = async (orderId: string, status: IOrder['status']) => {
	return (await axiosClient.patch<IOrder>(`/orders/${orderId}`, { status })).data
}

export const deleteOrderById = async (orderId: string) => {
	return (await axiosClient.delete<IOrder[]>(`/orders/${orderId}`)).data
}
