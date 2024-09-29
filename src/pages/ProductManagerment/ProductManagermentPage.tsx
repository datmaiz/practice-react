import { useCallback, useState } from 'react'

import { Modal } from '@/components/commons'
import { Button, Text } from '@/components/elements'
import { AddProductModal } from './AddProductModal'
import { ProductTable } from './ProductTable'

const ProductManagermentPage = () => {
	const [open, setOpen] = useState(false)

	const handleAddProductClick = useCallback(() => {
		setOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setOpen(false)
	}, [])

	return (
		<div>
			<section className='flex-ver justify-between py-3 border-b border-gray-500'>
				<Text
					variant={'secondary-bold'}
					level={'h4'}
				>
					Products List
				</Text>
				<Button
					variant={'secondary'}
					styleType={'filled'}
					onClick={handleAddProductClick}
				>
					add new product
				</Button>
			</section>
			<section className='overflow-auto p-0'>
				<ProductTable />
			</section>
			{open && (
				<Modal
					isShown={open}
					onClose={closeModal}
				>
					<AddProductModal onClose={closeModal} />
				</Modal>
			)}
		</div>
	)
}

export default ProductManagermentPage
