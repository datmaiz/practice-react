import { Dispatch, FC, SetStateAction, useState } from 'react'

import { Button, Input, Text } from '@/components/elements'
import { IProduct } from '@/common/interfaces'
import { CloseIcon } from '@/assets/icons/outlined'

interface MoreInformationProps {
	product: IProduct
	setProduct: Dispatch<SetStateAction<IProduct | undefined>>
	isSubmitting: boolean
}

export const MoreInformation: FC<MoreInformationProps> = ({ product, setProduct, isSubmitting }) => {
	const [size, setSize] = useState<string>('')
	const [color, setColor] = useState<string>('')
	const handleAddSize = () => {
		const newSizes = [...product.sizes, size]
		setProduct({ ...product, sizes: newSizes })
		setSize('')
	}

	const handleDeleteSize = (size: string) => {
		const newSizes = product.sizes.filter(each => size !== each)
		setProduct({ ...product, sizes: newSizes })
	}

	const handleAddColor = () => {
		const newColors = [...product.colors, color]
		setProduct({ ...product, colors: newColors })
		setColor('')
	}

	const handleDeletColor = (color: string) => {
		const newColors = product.colors.filter(each => color !== each)
		setProduct({ ...product, colors: newColors })
	}

	return (
		<section className='border border-gray-500 rounded-lg p-4'>
			<Text
				variant={'secondary-semi'}
				level={'h5'}
			>
				More information:
			</Text>
			<div className='flex items-end gap-2'>
				<Input
					variant={'secondary'}
					label='Size:'
					placeholder='Enter size'
					containerClassName='flex-1'
					value={size}
					onChange={e => setSize(e.target.value)}
				/>
				<Button
					variant={'secondary'}
					type='button'
					onClick={handleAddSize}
				>
					Add
				</Button>
			</div>
			{product.sizes.length > 0 && (
				<ul className='flex gap-2'>
					{product?.sizes.map(size => (
						<Tag
							key={size}
							content={size}
							onDeleteClick={() => handleDeleteSize(size)}
						/>
					))}
				</ul>
			)}
			<div className='flex items-end gap-2'>
				<Input
					variant={'secondary'}
					label='Color:'
					placeholder='Enter hex color'
					containerClassName='flex-1'
					value={color}
					onChange={e => setColor(e.target.value)}
				/>
				<Button
					variant={'secondary'}
					type='button'
					onClick={handleAddColor}
				>
					Add
				</Button>
			</div>
			{product.colors.length > 0 && (
				<ul className='flex gap-2'>
					{product?.colors.map(color => (
						<Tag
							key={color}
							content={color}
							onDeleteClick={() => handleDeletColor(color)}
						/>
					))}
				</ul>
			)}
			<Button
				loading={isSubmitting}
				variant={'secondary'}
			>
				Save
			</Button>
		</section>
	)
}

interface TagProps {
	content: string
	onDeleteClick: () => void
}

const Tag = ({ content, onDeleteClick }: TagProps) => {
	return (
		<li className='relative py-3 px-5 rounded-lg bg-gray-300'>
			<CloseIcon
				className='absolute top-2 right-2 cursor-pointer'
				onClick={onDeleteClick}
				width={10}
				height={10}
			/>
			<span>{content}</span>
		</li>
	)
}
