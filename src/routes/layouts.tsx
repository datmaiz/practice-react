import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

const BagPage = lazy(() => import('@/pages/Bag/BagPage'))
const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const EditProductPage = lazy(() => import('@/pages/EditProduct'))
const HomePage = lazy(() => import('@/pages/Home'))
const LoginPage = lazy(() => import('@/pages/Login/Login'))
const OrderManagermentPage = lazy(() => import('@/pages/OrderManagerment'))
const ProductDetailsPage = lazy(() => import('@/pages/ProductDetails'))
const ProductManageremntPage = lazy(() => import('@/pages/ProductManagerment'))
const RegisterPage = lazy(() => import('@/pages/Register'))
const SettingPage = lazy(() => import('@/pages/Setting'))
const UserManagermentPage = lazy(() => import('@/pages/UserManagement'))
const ClientOrderPage = lazy(() => import('@/pages/ClientOrder/ClientOrderPage'))

export const adminRoutes: RouteProps[] = [
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

export const clientRoutes: RouteProps[] = [
	{
		path: 'bags',
		element: <BagPage />,
	},
	{ path: 'orders', element: <ClientOrderPage /> },
]

export const publicRoutes: RouteProps[] = [
	{
		path: '',
		element: <HomePage />,
	},
	{
		path: 'products/:productId',
		element: <ProductDetailsPage />,
	},
]
