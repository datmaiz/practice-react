import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { BinIcon, PencilIcon } from '@/assets/icons/outlined'
import { IProduct, ITableColumn } from '@/common/interfaces'
import { Loader, Pagination } from '@/components/commons'
import { AutomaticTable, Image, Text } from '@/components/elements'
import { useDeleteProductMutation, useGetResourceWithPagination, usePagination, usePopup } from '@/hooks'
import { numberToCurrency, numberToDate, queryKeys } from '@/utils'

export const ProductTable = memo(() => {
	const { currentPage, nextPage, previousPage } = usePagination()
	const { openPopup } = usePopup()
	const naviagte = useNavigate()
	const { data: rows, isLoading } = useGetResourceWithPagination<IProduct[]>({
		resource: '/products',
		pagination: { _page: currentPage, _limit: 4 },
		queryKey: [queryKeys.PRODUCTS_WITH_PAGINATION, { page: currentPage }],
	})
	const deleteProductMutation = useDeleteProductMutation(currentPage)

	const columns: ITableColumn<Omit<IProduct, 'colors' | 'sizes'>>[] = [
		{
			title: '',
			key: 'productId',
			_style: { width: 100 },
			_className: 'aspect-square rounded-lg',
			render: product => (
				<Image
					src={product.images[0]}
					alt={product.name}
					shape={'rounded'}
					containerClassName='w-20 aspect-square'
				/>
			),
		},
		{
			title: 'Name',
			key: 'name',
			_className: 'h-[1lh]',
			render: product => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-2'
				>
					{product.name}
				</Text>
			),
		},
		{
			title: 'Price',
			key: 'price',
			_className: 'h-[1lh]',
			render: product => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
				>
					{numberToCurrency(product.price)}
				</Text>
			),
		},
		{
			title: 'Description',
			key: 'descriptions',
			_className: 'h-[1lh]',
			render: product => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-2'
				>
					{product.descriptions}
				</Text>
			),
		},
		{
			title: 'Published',
			key: 'publishedAt',
			_className: 'h-[1lh]',
			render: product => (
				<Text
					variant={'secondary-regular'}
					level={'h7'}
					className='line-clamp-2'
				>
					{numberToDate(product.publishedAt)},
				</Text>
			),
		},
		{
			title: '',
			key: 'images',
			_className: 'h-[1lh]',
			render: product => (
				<div className='flex-ver gap-4'>
					<PencilIcon
						width={20}
						height={20}
						onClick={() => naviagte(product.productId + `?page=${currentPage}`)}
						className='text-secondary cursor-pointer'
					/>
					<BinIcon
						width={20}
						height={20}
						onClick={() => handleDeleteProduct(product.productId)}
						className='text-secondary cursor-pointer'
					/>
				</div>
			),
		},
	]

	const handleDeleteProduct = async (productId: string) => {
		openPopup({
			content: 'This action will delete a product forever, are you sure about that ?',
			type: 'confirm',
			async callback() {
				deleteProductMutation.mutate(productId, {
					onSuccess: () => toast.success('Delete successfully'),
					onError: e => console.log(e.message),
				})
			},
		})
	}

	return (
		<div className='table-fixed w-full'>
			<AutomaticTable
				columns={columns}
				rows={rows?.data ?? []}
				rowKey={'productId'}
				_rowClassName='bg-white font-secondary-400'
				isLoading={isLoading}
				loadingRows={4}
			/>
			<Pagination
				total={rows?.pagination?._totalRows ?? 1}
				limit={rows?.pagination?._limit ?? 10}
				currentPage={currentPage}
				nextPage={nextPage}
				previousPage={previousPage}
			/>

			{deleteProductMutation.isPending && (
				<div className='fixed inset-0 bg-black/30 flex-center text-white'>
					<Loader size={'3xl'} />
				</div>
			)}
		</div>
	)
})
