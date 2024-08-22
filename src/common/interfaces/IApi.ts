export interface ISuccessResponse<T> {
	message: string
	data: T
}

export interface IErrorResponse<T> {
	error: T
}
