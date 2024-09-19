import { useCallback, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { BagIcon, GlassIcon, LogoutIcon, MenuIcon, PersonIcon } from '@/assets/icons/outlined'
import { Image, Text } from '@/components/elements'
import { useAuth, useGetBagsByUserId, usePopup } from '@/hooks'
import { ClientContainer } from '..'
import { Badge } from '../Badge/Badge'
import { ClientNavbar } from '../ClientNavbar/ClientNavbar'
import { SearchModal } from '../SearchModal/SearchModal'

export const ClientHeader = () => {
	const [isNavOpened, setIsNavOpened] = useState<boolean>(false)
	const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false)
	const { openPopup } = usePopup()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { auth, deleteInfo, isAuthenticated } = useAuth()
	const { data: bags = [] } = useGetBagsByUserId(auth?.id ?? '')

	const handleLogout = () => {
		openPopup({
			customTitle: 'Are you sure?',
			type: 'confirm',
			content: 'Continue, if you want to logout this account else press Cancel',
			callback() {
				navigate('/auth/login')
				deleteInfo()
			},
		})
	}

	const handleCloseModal = useCallback(() => {
		setIsSearchModalOpen(false)
	}, [])

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
							onClick={() => setIsSearchModalOpen(true)}
						/>
						{isAuthenticated ? (
							<Image
								src={auth?.avatar}
								containerClassName='w-[30px] h-[30px] rounded-full'
							/>
						) : (
							<PersonIcon
								width={27}
								height={27}
							/>
						)}
						<Badge countNumber={bags?.length ?? 0}>
							<BagIcon
								width={27}
								height={27}
								onClick={() => navigate('/bags')}
							/>
						</Badge>
						{isAuthenticated && (
							<LogoutIcon
								width={27}
								height={27}
								className='hidden sm:block'
								onClick={handleLogout}
							/>
						)}
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
			<SearchModal
				isOpen={isSearchModalOpen}
				onClose={handleCloseModal}
			/>
		</ClientContainer>
	)
}
