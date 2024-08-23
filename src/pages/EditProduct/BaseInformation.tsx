import { FC, memo } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Input, Text } from '@/components/elements'
import { DataForm } from './EditProductPage'

interface BaseInformationProps {
	register: UseFormRegister<DataForm>
	errors: FieldErrors<DataForm>
}

export const BaseInformation: FC<BaseInformationProps> = memo(({ register, errors }) => {
	return (
		<section className='flex flex-col gap-4 border border-gray-500 rounded-lg p-4'>
			<Text
				variant={'secondary-semi'}
				level={'h5'}
			>
				Base information:
			</Text>
			<Input
				variant={'secondary'}
				label='Name:'
				placeholder='Enter product name'
				error={errors.name?.message}
				register={register('name')}
			/>
			<Input
				variant={'secondary'}
				label='Price:'
				placeholder='Enter price'
				type='number'
				error={errors.price?.message}
				register={register('price', { valueAsNumber: true })}
			/>

			<div className='flex flex-col gap-2'>
				<label htmlFor='textarea'>Descriptions</label>
				<textarea
					placeholder='Enter description'
					className='border border-gray-500 rounded-lg resize-none h-[8lh] px-4 py-[10px] bg-transparent outline-none'
					{...register('descriptions')}
				></textarea>
			</div>
		</section>
	)
})
