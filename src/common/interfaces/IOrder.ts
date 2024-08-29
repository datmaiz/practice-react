import { IProductBase, IUserResponse } from '.'

export interface IOrder extends IProductBase {
	id: string
	userId: string
	thumb: string
	size: string
	color: string
	quantity: number
	status: 'waiting' | 'rejected' | 'accepted'
	orderedAt: number
}

export interface IOrderRequest extends IProductBase {
	userId: string
	thumb: string
	size: string
	color: string
	quantity: number
	status: IOrder['status']
	orderedAt: number
}

export interface IOrderResponseWithUser extends IProductBase {
	id: string
	user: IUserResponse
	thumb: string
	size: string
	color: string
	quantity: number
	status: IOrder['status']
	orderedAt: number
}
