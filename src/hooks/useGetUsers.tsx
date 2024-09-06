import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getUsers } from '@/services'
import { queryKeys } from '@/utils'
import { IUserResponse } from '@/common/interfaces'

export const useGetUsers = (): UseQueryResult<IUserResponse[], Error> => {
	const query = useQuery({
		queryKey: [queryKeys.USERS],
		queryFn: getUsers,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}
