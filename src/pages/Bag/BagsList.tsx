import { memo } from 'react'

import { Loader } from '@/components/commons'
import { useAuth, useGetBagsByUserId } from '@/hooks'
import { BagItem } from './BagItem'

export const BagsList = memo(() => {
	const { auth } = useAuth()
	const { data: bags = [], isLoading } = useGetBagsByUserId(auth!.id)

	return isLoading ? (
		<div className='h-20 flex-center text-primary'>
			<Loader size={'3xl'} />
		</div>
	) : (
		<div className='flex flex-col gap-8'>
			{bags.map(bag => (
				<BagItem
					key={bag.id}
					bag={bag}
				/>
			))}
		</div>
	)
})
