import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { IUser } from '@/common/interfaces'
import { useAuth } from '@/hooks'

interface RequiredRoleProps {
	role: IUser['role']
	children: ReactNode
}

export const RequiredRole = ({ role, children }: RequiredRoleProps) => {
	const { isAuthenticated, auth } = useAuth()

	if (!isAuthenticated)
		return (
			<Navigate
				to={'/auth/login'}
				replace
			/>
		)

	return auth?.role === role ? (
		children
	) : (
		<Navigate
			to={'/not-found'}
			replace
		/>
	)
}
