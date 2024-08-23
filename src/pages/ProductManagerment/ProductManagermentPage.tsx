import { MouseEvent, useEffect, useState } from 'react'

import { Text } from '@/components/elements'
import { AddProductModal } from './AddProductModal'
import { Button } from '@/components/elements'
import { ProductTable } from './ProductTable'
import { Modal } from '@/components/commons'
import { IProduct } from '@/common/interfaces'
import { getProducts } from '@/services'
import { toast } from 'react-toastify'

const ProductManagermentPage = () => {
	const [open, setOpen] = useState(false)
	const [products, setProducts] = useState<IProduct[]>([])

	const handleAddProductClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation()
		setOpen(true)
	}

	const addNewProduct = (product: IProduct) => {
		setProducts(prevProducts => [...prevProducts, product])
	}

	useEffect(() => {
		;(async () => {
			const response = await getProducts()
			if ('data' in response) {
				setProducts(response.data)
			} else {
				toast.error(response.error)
			}
		})()
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
				<ProductTable rows={products} />
			</section>
			{open && (
				<Modal
					isShown={open}
					onClose={() => setOpen(false)}
				>
					<AddProductModal
						addProduct={addNewProduct}
						onClose={() => setOpen(false)}
					/>
				</Modal>
			)}
		</div>
	)
}

export default ProductManagermentPage
