import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IOrder, IOrderRequest, IOrderResponseWithUser, IPagination } from '@/common/interfaces'
import { changeStatus, createOrder, deleteOrderById } from '@/services'
import { queryKeys } from '@/utils'
import { useAuth } from '.'

export const useAddOrderMutaion = (): UseMutationResult<IOrder, Error, IOrderRequest, unknown> => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (order: IOrderRequest) => createOrder(order),
		onMutate: order => {
			const queryKey = [queryKeys.ORDERS_WITH_USERS]
			queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)
			queryClient.setQueryData<IOrderRequest[]>(queryKey, old => (old ? [...old, order] : old))

			return { previousData }
		},
		onError: err => toast.error(err.message),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS_WITH_USERS] })
		},
	})

	return mutation
}

export const useDeleteOrderMutation = (): UseMutationResult<IOrder[], Error, string, unknown> => {
	const queryClient = useQueryClient()
	const { auth } = useAuth()

	const mutation = useMutation({
		mutationFn: (orderId: string) => deleteOrderById(orderId),
		onError: err => toast.error(err.message),
		onMutate: orderId => {
			const queryKey = [queryKeys.ORDERS_WITH_USERS, auth!.id]
			queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueriesData({ queryKey })
			queryClient.setQueriesData<IOrderResponseWithUser[]>({ queryKey }, old =>
				old?.filter(order => order.id !== orderId)
			)

			return { previousData }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS_WITH_USERS, auth!.id] })
		},
	})

	return mutation
}

export const useChangeStatusOrderMutation = (page: number) => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: ({ orderId, status }: { orderId: string; status: IOrder['status'] }) => changeStatus(orderId, status),
		onError: err => toast.error(err.message),
		onMutate: ({ orderId, status }) => {
			const queryKey = [queryKeys.ORDERS_WITH_USERS_AND_PAGINATION, page]
			queryClient.cancelQueries({ queryKey })

			const previousOrders = queryClient.getQueryData(queryKey)
			queryClient.setQueryData<IPagination<IOrderResponseWithUser[]>>(queryKey, old => {
				return old
					? {
							...old,
							data: old?.data.map(order => (order.id === orderId ? { ...order, status } : order)),
					  }
					: old
			})

			return { previousOrders }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS_WITH_USERS] })
		},
	})

	return mutation
}
