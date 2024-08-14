import { adminNavbarRoutes } from '@/utils/constants'
import { Children } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const AdminNavbar = () => {
	const { pathname } = useLocation()

	return (
		<nav>
			<ul>
				{Children.toArray(
					adminNavbarRoutes.map(({ path, text, icon }) => (
						<li>
							<Link
								className={`flex-ver gap-4 px-10 py-3 rounded-[4px] hover:bg-secondary hover:opacity-70 duration-300 ${
									pathname === path ? 'bg-secondary' : ''
								}`}
								to={path}
							>
								{icon && <span>{icon({ width: 20, height: 20 })}</span>}
								<p>{text}</p>
							</Link>
						</li>
					))
				)}
			</ul>
		</nav>
	)
}
