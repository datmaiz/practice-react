import { AdminSidebar } from '@/components/commons'
import { AdminSideBarHeader } from '@/components/commons/AdminSideBarHeader/AdminSideBarHeader'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout: FC = () => {
	return (
		<div className='flex h-dvh'>
			<aside className='bg-white-linen-100 max-w-[270px] w-full px-[25px] py-[18px]'>
				<AdminSidebar />
			</aside>
			<div className='flex-1 px-[30px]'>
				<AdminSideBarHeader />
				<main className='pt-[30px]'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
