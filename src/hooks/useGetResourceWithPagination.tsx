import { IPagination } from '@/common/interfaces'
import { axiosClient } from '@/utils'
import { QueryKey, UseQueryResult, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

interface IGetResourceWithPaginationProps<T> {
	resource?: string
	requestFn?: (props: Omit<IPagination<T>['pagination'], '_totalRows'>) => Promise<IPagination<T>>
	queryKey: QueryKey
	params?: Record<string, string>
	pagination: Omit<IPagination<T>['pagination'], '_totalRows'>
}

export const useGetResourceWithPagination = <T,>({
	resource,
	params,
	queryKey,
	requestFn,
	pagination,
}: IGetResourceWithPaginationProps<T>): UseQueryResult<IPagination<T>, Error> => {
	const getResources = useCallback(async () => {
		return requestFn
			? await requestFn(pagination)
			: (await axiosClient.get<IPagination<T>>(resource ?? '', { params: { ...params, ...pagination } })).data
	}, [requestFn, pagination, resource, params])

	const query = useQuery({
		queryKey: queryKey,
		queryFn: getResources,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}
