import { cva } from 'class-variance-authority'

export const imageVariants = cva('', {
	variants: {
		shape: {
			square: 'aspect-square',
			rectangle: '',
			circle: 'aspect-square rounded-full',
			rounded: 'rounded-lg',
		},
	},
	defaultVariants: {
		shape: 'rectangle',
	},
})
