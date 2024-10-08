export interface IUser {
	id: string
	username: string
	email: string
	password: string
	avatar: string
	role: 'admin' | 'user'
	createdAt: number
}

export interface IUserResponse {
	id: string
	username: string
	email: string
	avatar: string
	role: 'admin' | 'user'
	createdAt: number
}

export interface IUserRequest {
	id: string
	username: string
	email: string
	password: string
}
