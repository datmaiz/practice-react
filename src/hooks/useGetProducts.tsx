import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getProductById, getProducts } from '@/services'
import { queryKeys } from '@/utils'
import { IProduct } from '@/common/interfaces'

export const useGetProducts = (): UseQueryResult<IProduct[], Error> => {
	const query = useQuery({
		queryKey: [queryKeys.PRODUCTS],
		queryFn: getProducts,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}

export const useGetProductById = (productId: string) => {
	const query = useQuery({
		queryKey: [queryKeys.PRODUCTS, productId],
		queryFn: () => getProductById(productId),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	})

	return query
}
