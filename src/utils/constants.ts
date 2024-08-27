import { INavigation } from '@/common/interfaces'
import { BagIcon, HomeIcon, OrderIcon, PersonIcon, SettingIcon } from '@/assets/icons/outlined'

export const adminNavbarRoutes: INavigation[] = [
	{
		path: '/admin',
		text: 'Home',
		icon: HomeIcon,
	},
	{
		path: '/admin/users',
		text: 'User',
		icon: PersonIcon,
	},
	{
		path: '/admin/products',
		text: 'Product',
		icon: BagIcon,
	},
	{
		path: '/admin/orders',
		text: 'Order',
		icon: OrderIcon,
	},
	{
		path: '/admin/settings',
		text: 'Setting',
		icon: SettingIcon,
	},
]

export const clientNavbarRoutes: INavigation[] = [
	{
		path: '',
		text: 'Home',
	},
	{
		path: '/store',
		text: 'Store',
	},
	{
		path: '/accessories',
		text: 'Accessories',
	},
	{
		path: '/brand',
		text: 'Brand',
	},
	{
		path: '/pages',
		text: 'Pages',
	},
	{
		path: '/about',
		text: 'About us',
	},
	{
		path: '/orders',
		text: 'Order',
	},
	{
		path: '/contact',
		text: 'Contact us',
	},
]

export const baseURL = import.meta.env.VITE_BASE_URL
export const cloudName = import.meta.env.VITE_CLOUD_NAME
export const uploadAssetsName = import.meta.env.VITE_UPLOAD_ASSET_NAME
