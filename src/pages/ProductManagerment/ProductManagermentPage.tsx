import { MouseEvent, useState } from 'react'

import { Text } from '@/components/elements'
import { AddProductModal } from './AddProductModal'
import { Button } from '@/components/elements'
import { ProductTable } from './ProductTable'
import { Modal } from '@/components/commons'

const ProductManagermentPage = () => {
	const [open, setOpen] = useState(false)

	const handleAddProductClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation()
		setOpen(true)
	}

	console.log('product management page re-render')

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
