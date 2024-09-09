import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { IErrorResponse, IOrder, IOrderResponseWithUser } from '@/common/interfaces'
import { getAllOrders, getOrdersWithAllUsers, getOrdersWithAllUsersByUserId } from '@/services'
import { queryKeys } from '@/utils'

export const useGetAllOrders = (): UseQueryResult<IOrder[] | IErrorResponse, Error> => {
	const query = useQuery({
		queryKey: [queryKeys.ORDERS],
		queryFn: getAllOrders,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}

export const useGetOrdersWithAllUsers = (): UseQueryResult<IOrderResponseWithUser[], Error> => {
	const query = useQuery({
		queryKey: [queryKeys.ORDERS_WITH_USERS],
		queryFn: getOrdersWithAllUsers,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}

export const useGetOrdersWithUserByUserId = (userId: string): UseQueryResult<IOrderResponseWithUser[], Error> => {
	const query = useQuery({
		queryKey: [queryKeys.ORDERS_WITH_USERS, userId],
		queryFn: () => getOrdersWithAllUsersByUserId(userId),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}
