import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IOrder, IOrderRequest, IOrderResponseWithUser } from '@/common/interfaces'
import { changeStatus, createOrder, deleteOrderById } from '@/services'
import { queryKeys } from '@/utils'
import { useAuth } from '.'

export const useAddOrderMutaion = (): UseMutationResult<IOrder, Error, IOrderRequest, unknown> => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (order: IOrderRequest) => createOrder(order),

		onError: err => toast.error(err.message),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS] })
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

export const useChangeStatusOrderMutation = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: ({ orderId, status }: { orderId: string; status: IOrder['status'] }) => changeStatus(orderId, status),
		onError: err => toast.error(err.message),
		onMutate: ({ orderId, status }) => {
			const queryKey = [queryKeys.ORDERS_WITH_USERS]
			queryClient.cancelQueries({ queryKey })

			const previousOrders = queryClient.getQueryData(queryKey)
			queryClient.setQueryData<IOrderResponseWithUser[]>(queryKey, old =>
				old?.map(order => (order.id === orderId ? { ...order, status } : order))
			)

			return { previousOrders }
		},
		onSuccess: ({ id }) => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS_WITH_USERS, id] })
			queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS_WITH_USERS] })
		},
	})

	return mutation
}
