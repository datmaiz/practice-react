import { FC, memo, useEffect, useState } from 'react'

import { IOrder, IOrderResponseWithUser, ITableColumn } from '@/common/interfaces'
import { StatusButton } from '@/components/commons'
import { Pagination } from '@/components/commons/Pagination/Pagination'
import { AutomaticTable, Image, Text } from '@/components/elements'
import { changeStatus, getOrdersWithAllUsers } from '@/services'
import { numberToDate } from '@/utils'

type OrderColumn = Pick<IOrderResponseWithUser, 'id' | 'orderedAt' | 'thumb' | 'status' | 'quantity' | 'name' | 'user'>
type Status = IOrder['status']

export const OrderTable: FC = memo(() => {
	const [orders, setOrders] = useState<IOrderResponseWithUser[]>([])

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
			_style: { width: 150 },
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
			_className: 'text-center h-[1lh]',
			render: order => (
				<StatusButton
					status={order.status}
					children={order.status}
					onClick={() => handleChangeStatus(order.id, order.status)}
					className='rounded-lg'
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
		const response = await changeStatus(orderId, status)
		if ('data' in response) {
			const updatedOrders = orders.map(order => ({
				...order,
				status: order.id === orderId ? status : order.status,
			}))
			setOrders(updatedOrders)
		}
	}

	useEffect(() => {
		;(async () => {
			const response = await getOrdersWithAllUsers()
			if ('data' in response) {
				setOrders(response.data)
			}
		})()
	}, [])

	return (
		<div className='relative overflow-x-auto table-fixed w-full max-w-full'>
			<AutomaticTable
				columns={columns}
				rows={orders}
				rowKey={'id'}
				_rowClassName='bg-white font-secondary-400'
			/>
			<Pagination
				total={20}
				offset={1}
				limit={4}
			/>
		</div>
	)
})
