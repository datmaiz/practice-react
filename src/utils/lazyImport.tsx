import { Loader } from '@/components/commons'
import { Suspense, lazy } from 'react'

export const lazyImport = <T extends React.ComponentType<object>>(
	component: () => Promise<{
		default: () => JSX.Element
	}>
) => {
	const LazyComponent = lazy(component)

	return (props: React.ComponentProps<T>) => (
		<Suspense
			fallback={
				<div className='flex-center text-primary'>
					<Loader size={'3xl'} />
				</div>
			}
		>
			<LazyComponent {...props} />
		</Suspense>
	)
}
