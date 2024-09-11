import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'

import { IPagination, IUserResponse } from '@/common/interfaces'
import { deleteUser } from '@/services'
import { queryKeys } from '@/utils'

export const useDeleteUserMutation = (page: number): UseMutationResult<IUserResponse, Error, string, unknown> => {
	const queryClient = useQueryClient()
	const queryKey = [queryKeys.USER_WITH_PAGINATION, { page }]

	const mutation = useMutation({
		mutationFn: (userId: string) => deleteUser(userId),
		onMutate: (userId: string) => {
			queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueryData(queryKey)
			queryClient.setQueryData<IPagination<IUserResponse[]>>(queryKey, old =>
				old ? { ...old, data: old?.data?.filter(user => user.id !== userId) } : old
			)

			return { previousData }
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})

	return mutation
}
