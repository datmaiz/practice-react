import { toast } from 'react-toastify'
import { ChangeEvent, FC, memo } from 'react'

import { BinIcon } from '@/assets/icons/outlined'
import { ITableColumn, IUserResponse } from '@/common/interfaces'
import { AutomaticTable, Image, Text } from '@/components/elements'
import { changeRole } from '@/services'
import { Pagination } from '@/components/commons/Pagination/Pagination'

interface UserTableProps {
	rows: IUserResponse[]
	onDeleteUser: (userId: string) => void
}

export const UserTable: FC<UserTableProps> = memo(({ rows, onDeleteUser }) => {
	const columns: ITableColumn<Pick<IUserResponse, 'id' | 'avatar' | 'email' | 'role' | 'username'>>[] = [
		{
			title: 'Avatar',
			key: 'avatar',
			_style: { width: 100 },
			_className: 'aspect-square rounded-lg',
			render: user => (
				<Image
					src={user.avatar}
					alt='avatar user'
					shape={'rounded'}
					containerClassName='w-20 aspect-square'
				/>
			),
		},
		{
			title: 'Email',
			key: 'email',
			_className: 'h-[1lh]',
			render: user => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-2'
				>
					{user.email}
				</Text>
			),
		},
		{
			title: 'Role',
			key: 'role',
			_className: 'h-[1lh]',
			render: user => (
				<select
					defaultValue={user.role}
					onChange={e => handleRoleChange(e, user.id)}
					className='appearance-none outline-none px-4 py-2 rounded-lg text-center cursor-pointer'
				>
					<option value='user'>User</option>
					<option value='admin'>Admin</option>
				</select>
			),
		},
		{
			title: '',
			key: 'username',
			_className: 'h-[1lh]',
			render: user => (
				<BinIcon
					width={20}
					onClick={() => onDeleteUser(user.id)}
					className='text-secondary cursor-pointer'
				/>
			),
		},
	]

	const handleRoleChange = async (e: ChangeEvent<HTMLSelectElement>, userId: string) => {
		const response = await changeRole(e.target.value, userId)
		if ('data' in response) {
			toast.success(response.message)
		} else {
			toast.error(response.error)
		}
	}

	return (
		<div className='table-fixed w-full'>
			<AutomaticTable
				columns={columns}
				rows={rows}
				rowKey={'id'}
				_rowClassName='bg-white font-secondary-400'
				loadingRows={4}
			/>
			<Pagination
				total={20}
				offset={1}
				limit={4}
			/>
		</div>
	)
})
