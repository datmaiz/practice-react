import { cva } from 'class-variance-authority'

export const headingVariants = cva('', {
	variants: {
		variant: {
			'primary-bold': 'font-primary-700',
			'primary-regular': 'font-primary-400',
			'primary-light': 'font-primary-300',
			'secondary-bold': 'font-secondary-700',
			'secondary-semi': 'font-secondary-600',
			'secondary-regular': 'font-secondary-400',
		},
		level: {
			h1: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl',
			h2: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
			h3: 'text-base md:text-xl lg:text-2xl xl:text-[28px]',
			h4: 'text-base md:text-lg xl:text-[22px]',
			h5: 'text-base sm:text-lg xl:text-xl',
			h6: 'text-sm md:text-base xl:text-lg',
			h7: 'text-sm lg:text-base',
			h8: 'text-[12px] lg:text-sm',
		},
	},
	defaultVariants: {
		variant: 'primary-bold',
		level: 'h1',
	},
})
