import { lazyImport } from '@/utils/lazyImport'
import { RouteProps } from 'react-router-dom'

const BagPage = lazyImport(() => import('@/pages/Bag/BagPage'))
const DashboardPage = lazyImport(() => import('@/pages/Dashboard'))
const EditProductPage = lazyImport(() => import('@/pages/EditProduct'))
const HomePage = lazyImport(() => import('@/pages/Home'))
const LoginPage = lazyImport(() => import('@/pages/Login/Login'))
const OrderManagermentPage = lazyImport(() => import('@/pages/OrderManagerment'))
const ProductDetailsPage = lazyImport(() => import('@/pages/ProductDetails'))
const ProductManageremntPage = lazyImport(() => import('@/pages/ProductManagerment'))
const RegisterPage = lazyImport(() => import('@/pages/Register'))
const SettingPage = lazyImport(() => import('@/pages/Setting'))
const UserManagermentPage = lazyImport(() => import('@/pages/UserManagement'))
const ClientOrderPage = lazyImport(() => import('@/pages/ClientOrder/ClientOrderPage'))

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
