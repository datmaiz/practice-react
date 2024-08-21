import { LogoutIcon } from '@/assets/icons/outlined'
import { Text } from '@/components/elements'

export const AdminSidebarActions = () => {
	return (
		<div>
			<ul className='flex-col flex-ver'>
				<li className='flex-ver gap-4 px-10 py-3 rounded-[4px] hover:bg-secondary hover:opacity-70 duration-300 cursor-pointer'>
					<Text
						variant={'secondary-regular'}
						level={'h8'}
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
