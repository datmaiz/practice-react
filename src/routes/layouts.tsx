import { RouteProps } from 'react-router-dom'

import LoginPage from '@/pages/Login/Login'
import RegisterPage from '@/pages/Register/Register'

export const authRoutes: RouteProps[] = [
	{
		path: 'login',
		element: <LoginPage />,
	},
	{
		path: 'register',
		element: <RegisterPage />,
	},
]
