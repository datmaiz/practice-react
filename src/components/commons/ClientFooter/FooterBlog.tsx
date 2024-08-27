import { Text } from '@/components/elements'

export const FooterBlog = ({ day }: { day: number }) => {
	return (
		<div>
			<p className='text-[24px] text-white/50'>
				<span className='font-primary-400'>{day}</span>
				<span className='text-sm font-primary-400'>May</span>
			</p>
			<Text
				variant={'primary-light'}
				level={'h7'}
				className='pt-[14px]'
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</Text>
			<Text
				variant={'primary-regular'}
				level={'h8'}
				className='pt-2'
			>
				3 comments
			</Text>
		</div>
	)
}
