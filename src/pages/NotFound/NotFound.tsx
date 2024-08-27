import { NotFound } from '@/assets/images'
import { Image } from '@/components/elements'

export const NotFoundPage = () => {
	return (
		<div className='w-dvw h-dvh overflow-hidden relative'>
			<Image
				src={NotFound}
				alt='not found'
				className='absolute inset-0 object-contain'
			/>
		</div>
	)
}
