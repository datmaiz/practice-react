import { IProductBase } from '.'

export interface IBag extends IProductBase {
	id: string
	userId: string
	productId: string
	size: string
	color: string
	quantity: number
	thumb: string
}

export interface IBagRequest extends IProductBase {
	userId: string
	size: string
	color: string
	quantity: number
	thumb: string
}
