import { LetterIcon } from '@/assets/icons/outlined'
import { ClientContainer } from '@/components/commons'
import { Input, Text } from '@/components/elements'

export const Subscribe = () => {
	return (
		<ClientContainer>
			<section className='flex-col lg:flex-row flex-ver justify-between text-black-600 pt-[91px] pb-[110px]'>
				<div>
					<Text level={'h3'}>SING UP FOR THE NEWSLETTER</Text>
					<Text
						variant={'primary-regular'}
						level={'h6'}
						className='pt-2'
					>
						Subscribe for the latest stories and promotions
					</Text>
				</div>
				<div>
					<Input
						placeholder='Enter your e-mail address'
						className='w-[600px]'
						trailingIcon={LetterIcon}
					/>
				</div>
			</section>
		</ClientContainer>
	)
}
