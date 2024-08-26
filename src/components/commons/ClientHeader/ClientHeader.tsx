import { useEffect, useLayoutEffect, useState } from 'react'

import { Text } from '@/components/elements'
import { ClientContainer } from '..'
import { BagIcon, GlassIcon, HeartIcon, MenuIcon, PersonIcon } from '@/assets/icons/outlined'
import { Badge } from '../Badge/Badge'
import { ClientNavbar } from '../ClientNavbar/ClientNavbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBagsByUserId } from '@/services/bag.service'

export const ClientHeader = () => {
	const [isNavOpened, setIsNavOpened] = useState<boolean>(false)
	const [bagsCount, setBagsCount] = useState(0)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		;(async () => {
			const response = await getBagsByUserId('12ddqwqh')
			if ('data' in response) {
				setBagsCount(response.data.length)
			}
		})()
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
						/>
						<PersonIcon
							width={27}
							height={27}
						/>
						<Badge countNumber={bagsCount}>
							<BagIcon
								width={27}
								height={27}
								onClick={() => navigate('/bags')}
							/>
						</Badge>
						<HeartIcon
							width={27}
							height={27}
							className='hidden sm:block'
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
