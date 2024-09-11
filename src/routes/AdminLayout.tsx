import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { AdminDashboardHeader, AdminSidebar } from '@/components/commons'

const AdminLayout: FC = () => {
	return (
		<div className='flex h-dvh'>
			<aside className='bg-white-linen-100 max-w-[270px] w-fit px-[10px] md:px-[15px] xl:px-[25px] py-[18px] shrink-0'>
				<AdminSidebar />
			</aside>
			<div className='flex flex-1 flex-col bg-[#f8f8f8] h-dvh overflow-x-auto'>
				<div className='bg-white px-[30px]'>
					<AdminDashboardHeader />
				</div>
				<main className='px-[30px] flex-1 shrink-0 overflow-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
