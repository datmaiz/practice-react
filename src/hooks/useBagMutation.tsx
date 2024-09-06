import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IBag, IBagRequest } from '@/common/interfaces'
import { createBag, deleteBagById } from '@/services/bag.service'
import { queryKeys } from '@/utils'

export const useAddBagMutation = (): UseMutationResult<IBag, Error, IBagRequest, unknown> => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (bag: IBagRequest) => createBag(bag),
		onError: err => toast.error(err.message),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.BAGS] })
		},
	})

	return mutation
}

export const useDeleteBagMutation = (): UseMutationResult<IBag, Error, string, unknown> => {
	const queryClient = useQueryClient()
	const queryKey = [queryKeys.BAGS]
	const mutation = useMutation({
		mutationFn: (bagId: string) => deleteBagById(bagId),
		onError: err => toast.error(err.message),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey })
		},
	})

	return mutation
}
