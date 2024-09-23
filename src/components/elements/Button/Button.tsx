import { VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react'
import { buttonVariants } from './button-variants'
import cn from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	children: ReactNode
	loading?: boolean
}

export const Button: FC<ButtonProps> = memo(({ className, variant, styleType, loading, children, ...others }) => {
	return (
		<button
			className={cn(
				buttonVariants({ variant, styleType }),
				`inline-flex items-center gap-2 ${loading ? 'opacity-50' : ''}`,
				className
			)}
			disabled={loading}
			{...others}
		>
			{loading && (
				<span className={`block w-4 h-4 border-2 border-current rounded-full border-r-transparent animate-spin`}></span>
			)}
			{children}
		</button>
	)
})
