import { memo, useCallback } from 'react'

import { usePopup } from '@/hooks/usePopup'
import { Button, Text } from '../../elements'

export const GlobalPopup = memo(() => {
	const { type, content } = usePopup()

	return (
		<div className={`fixed inset-0 backdrop-blur-[10px] flex-center bg-black/40 ${content ? 'flex' : 'hidden'}`}>
			{type === 'confirm' && <ConfirmationPopup />}
		</div>
	)
})

const ConfirmationPopup = memo(() => {
	const { content, closePopup, customTitle } = usePopup()

	const handleCancelClick = useCallback(() => {
		closePopup({ type: 'confirm', isConfirm: false })
	}, [])

	const handleConfirmClick = useCallback(() => {
		closePopup({ type: 'confirm', isConfirm: true })
	}, [])

	return (
		<div className='max-w-[500px] w-full flex flex-col p-8 rounded-xl bg-white'>
			<Text
				variant={'secondary-bold'}
				level={'h3'}
				className='text-center'
			>
				{customTitle || 'Are you sure?'}
			</Text>
			<Text
				variant={'secondary-semi'}
				level={'h7'}
				className='py-8 text-gray-600 text-center'
			>
				{content}
			</Text>
			<div className='flex-ver gap-6'>
				<Button
					variant={'secondary'}
					styleType={'outlined'}
					className='flex-center flex-1'
					onClick={handleCancelClick}
				>
					Cancel
				</Button>
				<Button
					variant={'secondary'}
					styleType={'filled'}
					className='flex-center flex-1'
					onClick={handleConfirmClick}
				>
					Confirm
				</Button>
			</div>
		</div>
	)
})
