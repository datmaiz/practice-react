import { toast } from 'react-toastify'
import { FC, memo } from 'react'

import { deleteProduct } from '@/services'
import { numberToCurrency, numberToDate } from '@/utils'
import { IProduct, ITableColumn } from '@/common/interfaces'
import { BinIcon, PencilIcon } from '@/assets/icons/outlined'
import { AutomaticTable, Image, Text } from '@/components/elements'
import { usePopup } from '@/hooks/usePopup'
import { useNavigate } from 'react-router-dom'

interface ProductTableProps {
	rows: IProduct[]
}

export const ProductTable: FC<ProductTableProps> = memo(({ rows }) => {
	const { openPopup } = usePopup()
	const naviagte = useNavigate()
	const columns: ITableColumn<Pick<IProduct, 'id' | 'name' | 'price' | 'publishedAt' | 'images' | 'descriptions'>>[] = [
		{
			title: '',
			key: 'id',
			_style: { width: 100 },
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
			_className: 'w-[400px]',
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
			render: product => (
				<div className='flex-ver gap-4'>
					<PencilIcon
						width={20}
						height={20}
						onClick={() => naviagte(product.id)}
						className='text-secondary cursor-pointer'
					/>
					<BinIcon
						width={20}
						height={20}
						onClick={() => handleDeleteProduct(product.id)}
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
				const response = await deleteProduct(productId)
				console.log(response)
				if ('data' in response) {
					toast.success(response.message)
				} else {
					toast.error(response.error)
				}
			},
		})
	}

	return (
		<div className='overflow-auto table-fixed w-full'>
			<AutomaticTable
				columns={columns}
				rows={rows}
				rowKey={'id'}
				_rowClassName='bg-white font-secondary-400'
			/>
		</div>
	)
})
