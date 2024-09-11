import { FC, memo } from 'react'

import { IOrder, IOrderResponseWithUser, ITableColumn } from '@/common/interfaces'
import { Pagination, StatusButton } from '@/components/commons'
import { AutomaticTable, Image, Text } from '@/components/elements'
import { useChangeStatusOrderMutation, useGetResourceWithPagination, usePagination } from '@/hooks'
import { getOrdersWithAllUsersPerPage } from '@/services'
import { numberToDate, queryKeys } from '@/utils'

type OrderColumn = Omit<IOrderResponseWithUser, 'color' | 'descriptions' | 'price' | 'productId' | 'size'>
type Status = IOrder['status']

export const OrderTable: FC = memo(() => {
	const { currentPage, nextPage, previousPage } = usePagination()
	const { data: orders, isLoading } = useGetResourceWithPagination<IOrderResponseWithUser[]>({
		requestFn: getOrdersWithAllUsersPerPage,
		queryKey: [queryKeys.ORDERS_WITH_USERS_AND_PAGINATION, currentPage],
		pagination: { _limit: 4, _page: currentPage },
	})
	const changeStatusOrderMutation = useChangeStatusOrderMutation(currentPage)

	const columns: ITableColumn<OrderColumn>[] = [
		{
			title: '',
			key: 'thumb',
			_style: { width: 100 },
			_className: 'aspect-square rounded-lg',
			render: order => (
				<Image
					src={order.thumb}
					alt='product image'
					shape={'rounded'}
					containerClassName='w-20 aspect-square'
				/>
			),
		},
		{
			title: 'Username',
			key: 'user',
			_style: { width: 200 },
			_className: 'h-[1lh]',
			render: order => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-2'
				>
					{order.user.username}
				</Text>
			),
		},
		{
			title: 'Quantity',
			key: 'quantity',
			_style: { width: 150, textAlign: 'center' },
			_className: 'text-center h-[1lh]',
			render: order => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-1'
				>
					{order.quantity}
				</Text>
			),
		},
		{
			title: 'Status',
			key: 'status',
			_style: { textAlign: 'center' },
			_className: 'text-center h-[1lh]',
			render: order => (
				<StatusButton
					status={order.status}
					children={order.status}
					onClick={() => handleChangeStatus(order.id, order.status)}
					className='rounded-lg'
					isLoading={changeStatusOrderMutation.isPending}
				/>
			),
		},
		{
			title: 'Order time',
			key: 'orderedAt',
			_className: 'h-[1lh]',
			render: order => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-1'
				>
					{numberToDate(order.orderedAt)}
				</Text>
			),
		},
	]

	const handleChangeStatus = async (orderId: string, currentStatus: Status) => {
		const status: Status =
			currentStatus === 'waiting' ? 'accepted' : currentStatus === 'accepted' ? 'rejected' : 'waiting'
		changeStatusOrderMutation.mutate({ orderId, status })
	}

	return (
		<div className='relative overflow-x-auto table-fixed w-full max-w-full'>
			<AutomaticTable
				columns={columns}
				rows={orders?.data ?? []}
				rowKey={'id'}
				_rowClassName='bg-white font-secondary-400'
				loadingRows={4}
				isLoading={isLoading}
			/>
			<Pagination
				total={orders?.pagination?._totalRows ?? 1}
				currentPage={currentPage}
				limit={orders?.pagination?._limit ?? 10}
				nextPage={nextPage}
				previousPage={previousPage}
			/>
		</div>
	)
})
