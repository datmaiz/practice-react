import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { IUser } from '@/common/interfaces'
import { Text } from '@/components/elements'
import { deleteUser, getUsers } from '@/services'
import { UserTable } from './UserTable'

const UserManagermentPage = () => {
	const [users, setUsers] = useState<IUser[]>([])
	const { data, error } = useQuery({
		queryKey: [],
		queryFn: getUsers,
	})

	console.log(data, error)

	const handleDeleteUser = async (userId: string) => {
		const response = await deleteUser(userId)
		if ('data' in response) {
			toast.success(response.message)
			setUsers(users.filter(user => user.id !== userId))
		} else {
			toast.error(response.error)
		}
	}

	useEffect(() => {
		;(async () => {
			const response = await getUsers()
			if ('data' in response) {
				setUsers(response.data)
			}
		})()
	}, [])

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
				<UserTable
					onDeleteUser={handleDeleteUser}
					rows={users}
				/>
			</section>
		</div>
	)
}

export default UserManagermentPage
