import { useSearchParams } from 'react-router-dom'

import { IBagRequest, IProduct } from '@/common/interfaces'
import { Button, Text } from '@/components/elements'
import { numberToCurrency } from '@/utils'
import { ChangeEvent, useEffect, useState } from 'react'
import { Radio } from '@/components/elements/Radio/Radio'
import { AddIcon, MinusIcon } from '@/assets/icons/filled'
import { createBag } from '@/services/bag.service'
import { toast } from 'react-toastify'

interface ProductOptionsProps {
	product: IProduct
}

type OrderOption = Extract<keyof IProduct, 'images' | 'sizes'>

export const ProductOptions = ({ product }: ProductOptionsProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [option, setOption] = useState<OrderOption>('sizes')
	const [quantity, setQuantity] = useState(1)

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setOption(e.target.value as OrderOption)
	}

	const handleRadioChange = (value: string) => {
		setSearchParams(
			params => {
				params.set(option, value)
				return params
			},
			{ replace: true }
		)
	}

	const handleIncreaseQuantity = () => {
		setQuantity(quantity + 1)
	}

	const handleDecreaseQuantity = () => {
		setQuantity(quantity === 1 ? 1 : quantity - 1)
	}

	const handleOrder = async () => {
		const newBag: IBagRequest = {
			productId: product.productId,
			userId: '12ddqwqh',
			color: searchParams.get('colors')!,
			size: searchParams.get('sizes')!,
			descriptions: product.descriptions,
			name: product.name,
			price: product.price,
			thumb: product.images[0],
			quantity,
		}
		const response = await createBag(newBag)

		if ('data' in response) {
			toast.success(response.message)
		} else {
			toast.error(response.error)
		}
	}

	useEffect(() => {
		setSearchParams(
			params => {
				if (product.colors.length > 0) params.set('colors', product.colors[0])
				if (product.sizes.length > 0) params.set('sizes', product.sizes[0])
				return params
			},
			{ replace: true }
		)
	}, [])

	return (
		<div className='flex-1 pl-3'>
			<Text level={'h3'}>{product.name}</Text>
			<Text
				variant={'primary-regular'}
				level={'h4'}
				className='pt-6'
			>
				{numberToCurrency(product.price)}
			</Text>
			<div className='flex gap-4 pt-8'>
				{product[option].map(item => (
					<Radio
						key={item}
						title={option}
						content={item}
						name={option}
						checked={searchParams.get(option) === item}
						onChange={() => handleRadioChange(item)}
					/>
				))}
			</div>
			<div className='flex-ver justify-between pt-6'>
				<Text level={'h6'}>Quantity:</Text>
				<div className='flex-ver gap-4'>
					<MinusIcon
						onClick={() => handleDecreaseQuantity()}
						className='text-4xl p-2 w-10 h-10 rounded-full cursor-pointer flex-center border aspect-square'
					/>
					<span className='text-xl select-none'>{quantity}</span>
					<AddIcon
						onClick={() => handleIncreaseQuantity()}
						className='text-4xl p-2 w-10 h-10 rounded-full cursor-pointer flex-center border aspect-square'
					/>
				</div>
			</div>
			<div className='pt-8'>
				<select
					value={option}
					onChange={handleSelectChange}
					className='w-full px-4 py-3 outline-none font-primary-400 bg-transparent border border-black-600 cursor-pointer appearance-none select-none'
				>
					<option
						className='px-4 py-3 block'
						value='sizes'
					>
						Select size
					</option>
					<option
						className='px-4 py-3 block'
						value='colors'
					>
						Select color
					</option>
				</select>
			</div>
			<div className='pt-3'>
				<Button
					onClick={handleOrder}
					className='w-full bg-black-600 select-none'
				>
					add to bag
				</Button>
			</div>
		</div>
	)
}
