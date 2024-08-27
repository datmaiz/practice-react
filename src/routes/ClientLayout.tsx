import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ClientFooter, ClientHeader } from '@/components/commons'

export const ClientLayout = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window && window.scrollTo(0, 0)
	}, [pathname])

	return (
		<div className='max-w-[1440px] mx-auto'>
			<ClientHeader />
			<main>
				<Outlet />
			</main>
			<ClientFooter />
		</div>
	)
}
