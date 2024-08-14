import { FC } from 'react'

import { AdminSidebarHeader } from './AdminSidebarHeader'
import { AdminInfoPanel } from './AdminInfoPanel'
import { AdminNavbar } from './AdminNavbar'
import { AdminSidebarActions } from './AdminSidebarActions'

export const AdminSidebar: FC = () => {
	return (
		<aside className='w-full h-full flex-ver flex-col'>
			<AdminSidebarHeader />
			<div className='pt-[54px] flex-ver flex-col justify-between flex-1'>
				<AdminInfoPanel />
				<AdminNavbar />
				<AdminSidebarActions />
			</div>
		</aside>
	)
}
