import { FC, InputHTMLAttributes, useId } from 'react'
import { Text } from '..'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	title?: string
	content: string
}

export const Radio: FC<RadioProps> = ({ title, content, ...others }) => {
	const radioId = useId()

	return (
		<label
			htmlFor={radioId}
			className='has-[input:checked]:border-blue-500 border border-transparent rounded-lg px-4 py-2 block cursor-pointer duration-300 w-[100px] shadow-lg'
		>
			<Text
				level={'h8'}
				className='uppercase'
			>
				{title}
			</Text>
			<Text
				level={'h6'}
				className='pt-2'
			>
				{content}
			</Text>
			<input
				id={radioId}
				type='radio'
				hidden
				{...others}
			/>
		</label>
	)
}
