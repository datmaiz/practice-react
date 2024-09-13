import { LogoutIcon } from '@/assets/icons/outlined'
import { Text } from '@/components/elements'
import { useAuth, usePopup } from '@/hooks'
import { useNavigate } from 'react-router-dom'

export const AdminSidebarActions = () => {
	const { openPopup } = usePopup()
	const { deleteInfo } = useAuth()
	const navigate = useNavigate()

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

	return (
		<div>
			<ul className='flex-col flex-ver'>
				<li
					onClick={handleLogout}
					className='flex-ver gap-4 px-3 py-1 md:px-5 md:py-2 xl:px-10 xl:py-3 rounded-[4px] hover:bg-secondary hover:opacity-70 duration-300 cursor-pointer'
				>
					<Text
						variant={'secondary-regular'}
						level={'h8'}
						className='hidden md:block'
					>
						Logout
					</Text>
					<span>
						<LogoutIcon
							width={20}
							height={20}
						/>
					</span>
				</li>
			</ul>
		</div>
	)
}
