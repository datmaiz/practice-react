import { IUserResponse } from '@/common/interfaces'
import { useLocalStorage } from '.'

interface AuthData {
	isAuthenticated: boolean
	auth: IUserResponse | undefined
	changeAuthInfo: (data: IUserResponse) => void
	deleteInfo: () => void
}

export const useAuth = (): AuthData => {
	const { get, set: changeAuthInfo, remove: deleteInfo } = useLocalStorage('auth')
	const auth = get<IUserResponse>()
	const isAuthenticated = !!auth

	return { isAuthenticated, auth, changeAuthInfo, deleteInfo }
}
