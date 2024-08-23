import { RouteProps } from 'react-router-dom'

import DashboardPage from '@/pages/Dashboard'
import LoginPage from '@/pages/Login/Login'
import OrderManagermentPage from '@/pages/OrderManagerment'
import ProductManageremntPage from '@/pages/ProductManagerment'
import RegisterPage from '@/pages/Register/Register'
import SettingPage from '@/pages/Setting'
import UserManagermentPage from '@/pages/UserManagement'
import EditProductPage from '@/pages/EditProduct/EditProductPage'

export const adminLayouts: RouteProps[] = [
	{
		path: '',
		element: <DashboardPage />,
	},
	{
		path: 'users',
		element: <UserManagermentPage />,
	},
	{
		path: 'products',
		element: <ProductManageremntPage />,
	},
	{
		path: 'products/:productId',
		element: <EditProductPage />,
	},
	{
		path: 'orders',
		element: <OrderManagermentPage />,
	},
	{
		path: 'settings',
		element: <SettingPage />,
	},
]

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
