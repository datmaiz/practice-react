import { Text } from '@/components/elements'
import { UserTable } from './UserTable'

const UserManagermentPage = () => {
	return (
		<div>
			<Text
				variant={'secondary-bold'}
				level={'h4'}
				className='py-3 border-b border-gray-500'
			>
				Users List
			</Text>
			<section className='overflow-auto p-0'>
				<UserTable />
			</section>
		</div>
	)
}

export default UserManagermentPage
