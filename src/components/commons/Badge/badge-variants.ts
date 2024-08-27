import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
	'absolute min-w-[16px] min-h-[16px] aspect-square rounded-full bg-secondary text-white text-[10px] font-primary-400 flex-center',
	{
		variants: {
			position: {
				'top-left': 'top-0 left-0',
				'top-right': 'top-0 right-0',
				'bottom-left': 'bottom-0 left-0',
				'bottom-right': 'bottom-0 right-0',
			},
		},
		defaultVariants: {
			position: 'bottom-right',
		},
	}
)
