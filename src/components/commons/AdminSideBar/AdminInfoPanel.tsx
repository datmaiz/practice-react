import { Text } from '@/components/elements'

export const AdminInfoPanel = () => {
	return (
		<div className=''>
			<img
				src='https://vcdn1-giaitri.vnecdn.net/2024/07/08/tienluat-1720428436-1720428450-3509-1720429884.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=vx9fHK0PN4eW6VorV5kibw'
				alt='avatar'
				className='max-w-[128px] rounded-full aspect-square object-cover'
			/>
			<Text
				variant={'secondary-bold'}
				level={'h6'}
				className='pt-5 pb-[10px] text-center'
			>
				Tien Luat
			</Text>
			<Text
				variant={'secondary-regular'}
				level={'h8'}
				className='text-secondary text-center'
			>
				Admin
			</Text>
		</div>
	)
}
