import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input, Button } from '@/components/elements'
import { CloseIcon } from '@/assets/icons/outlined'
import { ImagePreview } from './ImagePreview'
import { createProduct } from '@/services'
import { toast } from 'react-toastify'
import { useClickOutside } from '@/hooks'
import { IProduct } from '@/common/interfaces'

interface AddProductModalProps {
	onClose: () => void
	addProduct: (product: IProduct) => void
}

const schema = z.object({
	name: z.string().trim().min(1, 'Name can not be empty'),
	price: z.number({ message: 'Price must be a number and can not be empty' }).min(0, 'Price must be greater than 0'),
	descriptions: z.string(),
	size: z.string().trim().min(1, 'Size can not be empty'),
	color: z.string().trim().min(1, 'Color can not be empty'),
})

type DataForm = z.infer<typeof schema>
export type TImagePreview = {
	files: File[]
	urls: string[]
}

export const AddProductModal: FC<AddProductModalProps> = ({ onClose, addProduct }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<DataForm>({ resolver: zodResolver(schema) })
	const [imagePreview, setImagePreview] = useState<TImagePreview>({ urls: [], files: [] })
	const ref = useRef(null)

	const onSubmit = async (data: DataForm) => {
		const newProduct = {
			name: data.name,
			price: data.price,
			descriptions: data.descriptions,
			sizes: [data.size],
			colors: [data.color],
			images: [],
			publishedAt: Date.now(),
		}
		const response = await createProduct(newProduct, imagePreview.files)

		if ('data' in response) {
			toast.success(response.message)
			addProduct(response.data)
		} else {
			toast.error(response.error)
		}
		onClose()
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const filesList = e.target.files
		const files = [...imagePreview.files]
		const urls = [...imagePreview.urls]
		if (filesList) {
			for (const f of filesList) {
				const previewImage = URL.createObjectURL(f)
				urls.push(previewImage)
				files.push(f)
			}
		}

		setImagePreview({ files, urls })
	}

	const handleRemoveImagePreview = useCallback(
		(src: string) => {
			const index = imagePreview.urls.indexOf(src)
			imagePreview.files.splice(index, 1)
			imagePreview.urls.splice(index, 1)
			URL.revokeObjectURL(imagePreview.urls[index])
			setImagePreview(prev => ({ files: prev.files, urls: prev.urls }))
		},
		[imagePreview]
	)

	useClickOutside(ref, () => {
		onClose()
	})

	return (
		<form
			className='max-w-[800px] w-full px-5 py-10 bg-white relative rounded-lg grid grid-cols-2 gap-4 shadow-lg'
			onSubmit={handleSubmit(onSubmit)}
			ref={ref}
		>
			<CloseIcon
				onClick={() => onClose()}
				className='absolute right-4 top-4 cursor-pointer'
			/>
			<div className='flex flex-col gap-4'>
				<Input
					label='Name'
					placeholder='Enter product name'
					variant='secondary'
					register={register('name')}
					error={errors.name?.message}
				/>
				<Input
					label='Price'
					placeholder='Enter price'
					type='number'
					variant='secondary'
					register={register('price', { valueAsNumber: true })}
					error={errors.price?.message}
				/>
				<div className='flex flex-col gap-2'>
					<label htmlFor='desc'>Descriptions</label>
					<textarea
						id='desc'
						className='border border-gray-500 rounded-lg resize-none px-4 py-[10px] outline-none h-[4lh]'
						placeholder='Enter description'
						{...register('descriptions')}
					></textarea>
				</div>
				<Input
					label='Size'
					placeholder='Enter sizes: (23x23)'
					variant='secondary'
					register={register('size')}
					error={errors.size?.message}
				/>
			</div>
			<div className='flex flex-col gap-4'>
				<Input
					label='Color'
					placeholder='Enter hex color (#00aefd)'
					variant='secondary'
					register={register('color')}
					error={errors.color?.message}
				/>
				<label
					htmlFor='image-picker'
					className='flex flex-col gap-2'
				>
					<input
						type='file'
						id='image-picker'
						multiple
						hidden
						onChange={handleFileChange}
					/>
					<p className='font-secondary-400'>Images</p>
					<p className='px-4 py-[10px] rounded-lg border text-center cursor-pointer border-gray-500'>
						Choose file here
					</p>
				</label>
				<div className='flex gap-4 overflow-x-scroll snap-mandatory'>
					{imagePreview.urls.map(url => (
						<ImagePreview
							key={url}
							src={url}
							onDelete={handleRemoveImagePreview}
						/>
					))}
				</div>
			</div>
			<div className='col-span-2 flex justify-end gap-4'>
				<Button
					variant={'secondary'}
					styleType={'outlined'}
					loading={isSubmitting}
					type='button'
					onClick={() => onClose()}
				>
					cancel
				</Button>
				<Button
					variant={'secondary'}
					styleType={'filled'}
					loading={isSubmitting}
				>
					add product
				</Button>
			</div>
		</form>
	)
}
