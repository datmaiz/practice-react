import { Text } from '@/components/elements'

export const AdminSidebarHeader = () => {
	return (
		<div className='flex-hor gap-[5px] hidden md:flex'>
			<span className='block w-1 bg-secondary'></span>
			<Text
				variant={'secondary-bold'}
				level={'h5'}
			>
				CRUD OPERATIONS
			</Text>
		</div>
	)
}
