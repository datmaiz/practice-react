import { cva } from 'class-variance-authority'

export const productCardVariants = cva('flex cursor-pointer', {
	variants: {
		direction: {
			horizontal: 'items-center gap-8',
			vertical: 'flex-col',
		},
	},
	defaultVariants: {
		direction: 'vertical',
	},
})
