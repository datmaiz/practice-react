import { IErrorResponse, IPagination, ISuccessResponse } from '@/common/interfaces'
import { IUser, IUserResponse } from '@/common/interfaces/IUser'
import { axiosClient, randomId, toURLSearchParams } from '@/utils'

const DEFAULT_AVATAR = 'https://random.imagecdn.app/500/500'

export const getUsers = async () => {
	return (await axiosClient.get<IUserResponse[]>('/users')).data
}

export const getUserPerPage = async <T>(paginationProps: Omit<IPagination<T>['pagination'], '_totalRows'>) => {
	const queryString = toURLSearchParams(paginationProps)
	return (await axiosClient.get<IPagination<T>>(`/users${queryString}`)).data
}

export const login = async (
	email: string,
	password: string
): Promise<ISuccessResponse<IUserResponse> | IErrorResponse<Record<string, string>>> => {
	const response = await axiosClient.get<IUser[]>('/users', { params: { email } })
	if (!response.data.length)
		return {
			error: {
				email: 'Email is not exist',
				password: '',
			},
		}

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

export const deleteUser = async (userId: string) => {
	return (await axiosClient.delete<IUserResponse>(`/users/${userId}`)).data
}

export const changeRole = async (role: string, userId: string) => {
	return (await axiosClient.patch<IUserResponse>(`/users/${userId}`, { role })).data
}
