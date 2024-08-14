import { LogoutIcon } from '@/assets/icons/outlined'

export const AdminSidebarActions = () => {
	return (
		<div>
			<ul className='flex-col flex-ver'>
				<li className='flex-ver gap-4 px-10 py-3 rounded-[4px] hover:bg-secondary hover:opacity-70 duration-300 cursor-pointer'>
					<span>
						<LogoutIcon
							width={20}
							height={20}
						/>
					</span>
					<p>Logout</p>
				</li>
			</ul>
		</div>
	)
}
