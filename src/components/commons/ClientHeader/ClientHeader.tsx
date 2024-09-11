import { useLayoutEffect, useState } from 'react'

import { Text } from '@/components/elements'
import { ClientContainer } from '..'
import { BagIcon, GlassIcon, LogoutIcon, MenuIcon, PersonIcon } from '@/assets/icons/outlined'
import { Badge } from '../Badge/Badge'
import { ClientNavbar } from '../ClientNavbar/ClientNavbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { useGetBagsByUserId } from '@/hooks/useGetBags'

export const ClientHeader = () => {
	const [isNavOpened, setIsNavOpened] = useState<boolean>(false)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { auth, deleteInfo } = useAuth()
	const { data: bags = [] } = useGetBagsByUserId(auth?.id ?? '')

	const handleLogout = () => {
		navigate('/auth/login')
		deleteInfo()
	}

	useLayoutEffect(() => {
		setIsNavOpened(false)
	}, [pathname])

	return (
		<ClientContainer>
			<header className=''>
				<div className='flex justify-between pt-[34px] pb-6'>
					<Text
						variant={'primary-bold'}
						level={'h3'}
					>
						MOODY STUDIO
					</Text>
					<div className='flex-ver gap-8 sm:gap-3 lg:gap-6 2xl:gap-10 *:cursor-pointer'>
						<GlassIcon
							width={27}
							height={27}
							className='hidden sm:block'
						/>
						<PersonIcon
							width={27}
							height={27}
						/>
						<Badge countNumber={bags?.length ?? 0}>
							<BagIcon
								width={27}
								height={27}
								onClick={() => navigate('/bags')}
							/>
						</Badge>
						<LogoutIcon
							width={27}
							height={27}
							className='hidden sm:block'
							onClick={handleLogout}
						/>
						<MenuIcon
							width={27}
							height={27}
							className='sm:hidden'
							onClick={() => setIsNavOpened(true)}
						/>
					</div>
				</div>
				<ClientNavbar
					onCloseNavbar={() => setIsNavOpened(false)}
					isNavOpened={isNavOpened}
				/>
			</header>
		</ClientContainer>
	)
}
