import { VariantProps } from 'class-variance-authority'
import { FC, FunctionComponent, InputHTMLAttributes, SVGProps, useId } from 'react'

import cn from '@/utils/cn'
import { inputVariants } from './input-variants'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
	containerClassName?: string
	label?: string
	error?: string
	errorCustom?: string
	leadingIcon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>
	trailingIcon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>
	onLeadingIconClick?: () => void
	onTrailingIconClick?: () => void
	register?: UseFormRegisterReturn
}

export const Input: FC<InputProps> = ({
	containerClassName,
	className,
	label,
	variant = 'primary',
	error,
	errorCustom,
	leadingIcon,
	onLeadingIconClick,
	trailingIcon,
	onTrailingIconClick,
	register,
	...others
}) => {
	const id = useId()

	return (
		<div className={cn('flex flex-col', containerClassName)}>
			{label && (
				<label
					className={`text-[1em] pb-2 ${variant === 'secondary' ? 'font-secondary-400' : 'font-primary-400'}`}
					htmlFor={id}
				>
					{label}
				</label>
			)}
			{!leadingIcon && !trailingIcon ? (
				<input
					id={id}
					className={cn(inputVariants({ variant }), `text-[1em] ${error ? 'border-red-500' : ''}`, className)}
					{...register}
					{...others}
				/>
			) : (
				<div
					className={cn(
						inputVariants({ variant }),
						`text-[1em] relative ${leadingIcon ? 'pl-8' : ''} ${trailingIcon ? 'pr-8' : ''} ${
							error ? 'border-red-500' : ''
						}`,
						className
					)}
				>
					{leadingIcon?.({
						className: 'absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer',
						onClick: onLeadingIconClick,
					})}
					<input
						id={id}
						className='outline-none w-full h-full text-[1em]'
						{...register}
						{...others}
					/>
					{trailingIcon?.({
						className: `absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ${
							variant === 'primary' ? 'text-black' : 'text-gray-500'
						}`,
						onClick: onTrailingIconClick,
					})}
				</div>
			)}
			<p className={cn('text-red-500 text-[0.9em]', errorCustom)}>{error}</p>
		</div>
	)
}
