import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'

import { IPagination, IProduct } from '@/common/interfaces'
import { createProduct, deleteProduct, updateProduct } from '@/services'
import { queryKeys } from '@/utils'

export const useAddProductMutation = (
	page: number
): UseMutationResult<
	Omit<IProduct, 'productId'>,
	Error,
	{
		product: Omit<IProduct, 'productId'>
		files: File[]
	},
	unknown
> => {
	const queryClient = useQueryClient()
	const queryKey = [queryKeys.PRODUCTS_WITH_PAGINATION, { page }]

	const mutation = useMutation({
		mutationFn: ({ product, files }: { product: Omit<IProduct, 'productId'>; files: File[] }) =>
			createProduct(product, files),
		onMutate: ({ product, files }) => {
			queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueriesData({ queryKey })
			const newProduct = {
				...product,
				images: files.length ? [URL.createObjectURL(files[0])] : [],
			}
			queryClient.setQueryData<IPagination<Omit<IProduct, 'productId'>[]>>(queryKey, old => {
				console.log(old)
				return old ? { ...old, data: [...old?.data, newProduct] } : old
			})

			return { previousData }
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})

	return mutation
}

export const useDeleteProductMutation = (page: number): UseMutationResult<IProduct, Error, string, unknown> => {
	const queryClient = useQueryClient()
	const queryKey = [queryKeys.PRODUCTS_WITH_PAGINATION, { page }]

	const mutation = useMutation({
		mutationFn: (productId: string) => deleteProduct(productId),
		onMutate: productId => {
			queryClient.cancelQueries({ queryKey })

			const previousData = queryClient.getQueriesData({ queryKey })
			console.log(previousData)
			queryClient.setQueryData<IPagination<IProduct[]>>(queryKey, old =>
				old ? { ...old, data: old?.data?.filter(product => product.productId !== productId) } : old
			)

			return { previousData }
		},
		onSettled: () => {
			console.log('settled')
			queryClient.invalidateQueries({ queryKey })
		},
	})

	return mutation
}

export const useUpdateProductMuatation = (
	page: number
): UseMutationResult<
	IProduct,
	Error,
	{
		product: IProduct
		files: File[]
	},
	unknown
> => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: ({ product, files }: { product: IProduct; files: File[] }) => updateProduct(product, files),
		onMutate: ({ product, files }) => {
			const queryKey = [queryKeys.PRODUCTS_WITH_PAGINATION, { page }]
			queryClient.cancelQueries({ queryKey })

			const newImages = [...product.images, ...files.map(file => URL.createObjectURL(file))]

			console.log(queryClient.getQueriesData({ queryKey: [queryKeys.PRODUCTS_WITH_PAGINATION, { page: 4 }] }))
			console.log('queryKey', queryKey)
			const previousData = queryClient.getQueriesData({ queryKey: queryKey })
			console.log(previousData)
			queryClient.setQueryData<IPagination<IProduct[]>>(queryKey, old => {
				console.log(old)
				return old
					? {
							...old,
							data: old?.data?.map(each =>
								each.productId === product.productId ? { ...product, images: newImages } : each
							),
					  }
					: old
			})

			return { previousData }
		},
		onError: e => console.log(e.message),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.PRODUCTS_WITH_PAGINATION, { page }] })
		},
	})

	return mutation
}
