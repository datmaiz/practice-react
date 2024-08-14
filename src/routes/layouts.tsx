import { RouteProps } from 'react-router-dom'

import DashboardPage from '@/pages/Dashboard'
import UserManagermentPage from '@/pages/UserManagement'
import ProductManageremntPage from '@/pages/ProductManagerment'
import OrderManagermentPage from '@/pages/OrderManagerment'
import SettingPage from '@/pages/Setting'

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
		path: 'orders',
		element: <OrderManagermentPage />,
	},
	{
		path: 'settings',
		element: <SettingPage />,
	},
]
