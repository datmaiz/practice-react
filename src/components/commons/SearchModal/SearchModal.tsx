import { FormEvent, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlassIcon } from '@/assets/icons/outlined'
import { IProduct } from '@/common/interfaces'
import { Image, Input, Text } from '@/components/elements'
import { searchProducts } from '@/services'
import { Loader, Modal } from '..'

interface SearchModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SearchModal = memo(({ isOpen, onClose }: SearchModalProps) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [products, setProducts] = useState<IProduct[]>()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		const response = await searchProducts(searchQuery)
		if ('data' in response) {
			setProducts(response.data)
		} else {
			setProducts([])
		}
		setLoading(false)
	}

	const handleItemClick = (productId: string) => {
		navigate(`/products/${productId}`)
		onClose()
		setSearchQuery('')
		setProducts([])
	}

	const handleCloseModal = () => {
		onClose()
		setSearchQuery('')
		setProducts([])
	}

	return (
		<Modal
			isShown={isOpen}
			onClose={handleCloseModal}
		>
			<form
				onSubmit={handleSubmitForm}
				className='flex-hor self-start pt-[30px] relative'
			>
				<Input
					placeholder='Search...'
					leadingIcon={GlassIcon}
					className='pl-12 bg-transparent w-[300px]'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				<div className='absolute w-full top-full flex-col max-h-[256px] overflow-y-auto'>
					{loading && (
						<div className='flex-hor py-4 text-primary'>
							<Loader size={'md'} />
						</div>
					)}
					{!loading &&
						products?.map(product => (
							<SearchResult
								key={product.productId}
								product={product}
								onItemClick={() => handleItemClick(product.productId)}
							/>
						))}
				</div>
			</form>
		</Modal>
	)
})

interface SearchResultProps {
	product: IProduct
	onItemClick: () => void
}

const SearchResult = ({ product, onItemClick }: SearchResultProps) => {
	return (
		<div
			onClick={onItemClick}
			className='w-full flex gap-2 bg-white cursor-pointer p-2 duration-300 hover:bg-gray-200'
		>
			<Image
				src={product.images[0]}
				alt={product.name}
				containerClassName='w-12 aspect-square shrink-0'
			/>
			<Text level={'h8'}>
				<p className='line-clamp-2 break-words'>{product.name}</p>
			</Text>
		</div>
	)
}
