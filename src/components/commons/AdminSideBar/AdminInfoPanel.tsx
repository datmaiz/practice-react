import { Text } from '@/components/elements'
import { useAuth } from '@/hooks'

export const AdminInfoPanel = () => {
	const { auth } = useAuth()
	return (
		<div className=''>
			<img
				src={auth?.avatar}
				alt='avatar'
				className='max-w-[45px] md:max-w-[70px] xl:max-w-[128px] rounded-full aspect-square object-cover mx-auto'
			/>
			<Text
				variant={'secondary-bold'}
				level={'h6'}
				className='pt-5 pb-[10px] text-center hidden md:block'
			>
				{auth?.username}
			</Text>
			<Text
				variant={'secondary-regular'}
				level={'h8'}
				className='text-secondary text-center hidden md:block'
			>
				Admin
			</Text>
		</div>
	)
}
