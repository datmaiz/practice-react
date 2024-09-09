import { IBag } from '@/common/interfaces'
import { getBagsByUserId } from '@/services/bag.service'
import { queryKeys } from '@/utils'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useGetBagsByUserId = (userId: string): UseQueryResult<IBag[], Error> => {
	const query = useQuery({
		queryKey: [queryKeys.BAGS, userId],
		queryFn: () => getBagsByUserId(userId),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}
