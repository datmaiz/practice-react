import { CloseIcon } from '@/assets/icons/outlined'
import { Text } from '@/components/elements'
import { clientNavbarRoutes } from '@/utils'
import { Link } from 'react-router-dom'

interface ClientNavbarProps {
	isNavOpened: boolean
	onCloseNavbar: () => void
}

export const ClientNavbar = ({ isNavOpened, onCloseNavbar }: ClientNavbarProps) => {
	return (
		<nav className={`flex-center py-[38px] fixed sm:border-y border-black-600 sm:flex duration-300 sm:static`}>
			<ul
				className={`flex-ver flex-col fixed p-8 sm:p-0 bg-white inset-0 sm:inset-auto duration-300 sm:bg-transparent sm:translate-x-0 sm:static sm:flex-row gap-3 md:gap-6 lg:gap-14 2xl:gap-[70px] ${
					!isNavOpened ? '-translate-x-full' : 'translate-x-0'
				}`}
			>
				<CloseIcon
					onClick={onCloseNavbar}
					className='absolute right-4 top-4 cursor-pointer sm:hidden'
				/>
				{clientNavbarRoutes.map(route => (
					<li key={route.path}>
						<Text level={'h6'}>
							<Link
								className='uppercase font-primary-700'
								to={route.path}
							>
								{route.text}
							</Link>
						</Text>
					</li>
				))}
			</ul>
		</nav>
	)
}
