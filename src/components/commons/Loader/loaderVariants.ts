import { cva } from 'class-variance-authority'

export const loaderVariants = cva('block border-2 border-current rounded-full border-r-transparent animate-spin', {
	variants: {
		size: {
			xs: 'size-4',
			sm: 'size-5',
			md: 'size-6',
			lg: 'size-7',
			xl: 'size-8',
			'2xl': 'size-9',
			'3xl': 'size-10',
		},
	},
	defaultVariants: {
		size: 'xs',
	},
})
