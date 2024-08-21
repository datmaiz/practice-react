import { IErrorResponse, ISuccessResponse } from '@/common/interfaces'
import { IUser } from '@/common/interfaces/IUser'
import { axiosClient, randomId } from '@/utils'
import axios from 'axios'

const DEFAULT_AVATAR = 'https://i.pinimg.com/originals/b0/fa/60/b0fa601db1900915eb5b43bfb5ad8077.jpg'

export const getUsers = async (): Promise<ISuccessResponse<IUser[]> | IErrorResponse<string>> => {
	try {
		const response = await axios.get<IUser[]>('/users')
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

export const login = async (
	email: string,
	password: string
): Promise<ISuccessResponse<IUser> | IErrorResponse<Record<string, string>>> => {
	try {
		const response = await axiosClient.get<IUser[]>('/users', { data: { email } })
		if (!response.data.length)
			return {
				error: {
					email: 'Email is not exist',
					password: '',
				},
			}
		console.log(response.data[0], password)
		if (response.data[0].password !== password)
			return {
				error: {
					email: '',
					password: 'Password is not valid! Please try another!',
				},
			}

		return {
			message: '',
			data: response.data[0],
		}
	} catch (error) {
		return {
			error: {
				notification: error instanceof Error ? error.message : String(error),
			},
		}
	}
}

export const getUserByEmail = async (email: string): Promise<ISuccessResponse<IUser> | IErrorResponse<string>> => {
	try {
		const response = await axiosClient.get<IUser[]>(`/users?email=${email}`)
		if (!response.data.length) {
			return { error: 'Email is already taken' }
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

export const register = async (
	user: Pick<IUser, 'email' | 'password' | 'username'>
): Promise<ISuccessResponse<IUser> | IErrorResponse<string>> => {
	const foundUserResponse = await getUserByEmail(user.email)
	console.log(foundUserResponse)
	if ('data' in foundUserResponse)
		return {
			error: 'Email is already taken',
		}

	try {
		const response = await axiosClient.post<IUser>('/users', {
			...user,
			id: randomId(),
			role: 'user',
			avatar: DEFAULT_AVATAR,
		})
		return {
			message: 'Register successfully',
			data: response.data,
		}
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export const deleteUser = async () => {}

export const updateUser = async () => {}
