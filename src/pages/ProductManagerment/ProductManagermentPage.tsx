import { useState } from 'react'

import { Modal } from '@/components/commons'
import { Button, Text } from '@/components/elements'
import { AddProductModal } from './AddProductModal'
import { ProductTable } from './ProductTable'

const ProductManagermentPage = () => {
	const [open, setOpen] = useState(false)

	const handleAddProductClick = () => {
		setOpen(true)
	}

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
					onClose={() => setOpen(false)}
				>
					<AddProductModal onClose={() => setOpen(false)} />
				</Modal>
			)}
		</div>
	)
}

export default ProductManagermentPage
