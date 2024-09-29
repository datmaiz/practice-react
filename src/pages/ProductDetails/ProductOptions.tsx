import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AddIcon, MinusIcon } from '@/assets/icons/filled'
import { IBagRequest, IProduct } from '@/common/interfaces'
import { Button, Radio, Text } from '@/components/elements'
import { useAddBagMutation, useAuth } from '@/hooks'
import { numberToCurrency } from '@/utils'

interface ProductOptionsProps {
	product: IProduct
}

type OrderOption = Extract<keyof IProduct, 'images' | 'sizes'>

export const ProductOptions = ({ product }: ProductOptionsProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [option, setOption] = useState<OrderOption>('sizes')
	const [quantity, setQuantity] = useState(1)
	const navigate = useNavigate()
	const { auth, isAuthenticated } = useAuth()

	const addBagMutation = useAddBagMutation()

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setOption(e.target.value as OrderOption)
	}

	const handleRadioChange = useCallback((value: string) => {
		setSearchParams(
			params => {
				params.set(option, value)
				return params
			},
			{ replace: true }
		)
	}, [])

	const handleIncreaseQuantity = useCallback(() => {
		setQuantity(quantity + 1)
	}, [quantity])

	const handleDecreaseQuantity = useCallback(() => {
		setQuantity(quantity === 1 ? 1 : quantity - 1)
	}, [])

	const handleAddToBag = async () => {
		if (!isAuthenticated) {
			navigate('/auth/login')
			return
		}

		const newBag: IBagRequest = {
			productId: product.productId,
			userId: auth!.id,
			color: searchParams.get('colors')!,
			size: searchParams.get('sizes')!,
			descriptions: product.descriptions,
			name: product.name,
			price: product.price,
			thumb: product.images[0],
			quantity,
		}
		addBagMutation.mutate(newBag, {
			onSuccess: () => toast.success('Add to bag successfully'),
			onError: err => toast.error(err.message),
		})
	}

	useEffect(() => {
		setSearchParams(
			params => {
				if (product.colors.length > 0 && !params.get('colors')) params.set('colors', product.colors[0])
				if (product.sizes.length > 0 && !params.get('sizes')) params.set('sizes', product.sizes[0])
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
				<Options
					product={product}
					option={option}
					handleRadioChange={handleRadioChange}
				/>
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
					onClick={handleAddToBag}
					loading={addBagMutation.isPending}
					className='w-full bg-black-600 select-none'
				>
					add to bag
				</Button>
			</div>
		</div>
	)
}

interface OptionsProps {
	product: IProduct
	option: OrderOption
	handleRadioChange: (item: string) => void
}

const Options = memo(({ product, option, handleRadioChange }: OptionsProps) => {
	const [searchParams] = useSearchParams()

	return product[option].map(item => (
		<Radio
			key={item}
			title={option}
			content={item}
			name={option}
			checked={searchParams.get(option) === item}
			onChange={() => handleRadioChange(item)}
		/>
	))
})
