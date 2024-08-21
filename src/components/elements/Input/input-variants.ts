import { cva } from 'class-variance-authority'

export const inputVariants = cva('bg-transparent border border-gray-500 outline-none', {
	variants: {
		variant: {
			primary: 'py-[15px] px-[10px] rounded-[5px] border-black font-primary-400',
			secondary: 'px-4 py-[10px] rounded-lg font-secondary-400',
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
})
