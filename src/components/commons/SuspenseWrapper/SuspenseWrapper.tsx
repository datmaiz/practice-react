import { ReactNode, Suspense } from 'react'
import { Loader } from '..'

export const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<Suspense
			fallback={
				<div className='flex-center text-primary'>
					<Loader size={'3xl'} />
				</div>
			}
		>
			{children}
		</Suspense>
	)
}
