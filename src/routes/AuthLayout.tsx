import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
	return (
		<div className='bg-white flex-center h-dvh font-primary-400'>
			<div className='max-w-[500px] w-full'>
				<Outlet />
			</div>
		</div>
	)
}
