import { useMutation } from '@tanstack/react-query'
import { memo } from 'react'
import { toast } from 'react-toastify'

import { BinIcon } from '@/assets/icons/outlined'
import { ITableColumn, IUserResponse } from '@/common/interfaces'
import { Loader, Pagination } from '@/components/commons'
import { AutomaticTable, Image, Text } from '@/components/elements'
import { useDeleteUserMutation, useGetResourceWithPagination, usePagination, usePopup } from '@/hooks'
import { changeRole } from '@/services'
import { queryKeys } from '@/utils'

export const UserTable = memo(() => {
	const { currentPage, nextPage, previousPage } = usePagination()

	const { data: rows, isLoading } = useGetResourceWithPagination<IUserResponse[]>({
		resource: '/users',
		queryKey: [queryKeys.USER_WITH_PAGINATION, { page: currentPage }],
		pagination: { _limit: 4, _page: currentPage },
	})
	const { openPopup } = usePopup()
	const changeRoleMutation = useMutation({
		mutationFn: ({ role, userId }: { role: string; userId: string }) => changeRole(role, userId),
	})
	const deleteUserMutation = useDeleteUserMutation(currentPage)

	const columns: ITableColumn<Omit<IUserResponse, 'createdAt'>>[] = [
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
					onChange={e => handleRoleChange(e.target.value, user.id)}
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
					onClick={() => handleDeleteUser(user.id)}
					className='text-secondary cursor-pointer'
				/>
			),
		},
	]

	const handleRoleChange = async (role: string, userId: string) => {
		changeRoleMutation.mutate({ role, userId })
		if (changeRoleMutation.isSuccess) {
			toast.success('Change role successfully')
		}

		if (changeRoleMutation.isError) {
			toast.error(changeRoleMutation.error.message)
		}
	}

	const handleDeleteUser = (userId: string) => {
		openPopup({
			type: 'confirm',
			content: 'This action will delete a user forever. Are you sure?',
			callback() {
				deleteUserMutation.mutate(userId)
			},
		})
	}

	return (
		<div className='table-fixed w-full'>
			<AutomaticTable
				columns={columns}
				rows={rows?.data ?? []}
				rowKey={'id'}
				_rowClassName='bg-white font-secondary-400'
				loadingRows={4}
				isLoading={isLoading}
			/>
			<Pagination
				total={rows?.pagination._totalRows ?? 0}
				currentPage={currentPage}
				limit={rows?.pagination._limit ?? 10}
				nextPage={nextPage}
				previousPage={previousPage}
			/>

			{(changeRoleMutation.isPending || deleteUserMutation.isPending) && (
				<div className='fixed inset-0 bg-black/30 flex-center text-white'>
					<Loader size={'3xl'} />
				</div>
			)}
		</div>
	)
})
