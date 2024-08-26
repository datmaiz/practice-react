export interface IProductBase {
	productId: string
	name: string
	price: number
	descriptions: string
}

export interface IProduct extends IProductBase {
	images: string[]
	colors: string[]
	sizes: string[]
	publishedAt: number
}
