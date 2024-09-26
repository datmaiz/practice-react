import { Children } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Text } from '@/components/elements'
import { adminNavbarRoutes } from '@/routes'
import { isActiveLink } from '@/utils'

export const AdminNavbar = () => {
	const { pathname } = useLocation()

	return (
		<nav>
			<ul>
				{Children.toArray(
					adminNavbarRoutes.map(({ path, text, icon }) => (
						<li>
							<Link
								className={`flex-ver gap-4 px-3 py-1 md:px-5 md:py-2 xl:px-10 xl:py-3 rounded-[4px] hover:bg-secondary hover:opacity-70 duration-300 ${
									isActiveLink(path, pathname, '/admin') ? 'bg-secondary' : ''
								}`}
								to={path}
							>
								{icon && <span>{icon({ width: 20, height: 20 })}</span>}
								<Text
									variant={'secondary-regular'}
									level={'h8'}
									className='hidden md:block'
								>
									{text}
								</Text>
							</Link>
						</li>
					))
				)}
			</ul>
		</nav>
	)
}
