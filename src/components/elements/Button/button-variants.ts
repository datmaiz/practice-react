import { cva } from 'class-variance-authority'

export const buttonVariants = cva('border uppercase inline-flex justify-center items-center', {
	variants: {
		variant: {
			primary: 'border-current px-[10px] py-[15px] text-black bg-black font-primary-700 text-base',
			secondary: 'border-current px-[26px] py-[13px] rounded-[4px] text-secondary bg-secondary',
		},
		styleType: {
			filled: 'text-white',
			outlined: 'bg-transparent',
		},
	},
	defaultVariants: {
		variant: 'primary',
		styleType: 'filled',
	},
})
