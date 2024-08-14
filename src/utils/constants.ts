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
