import { IBag } from '@/common/interfaces'
import { FC } from 'react'
import { BagItem } from './BagItem'

interface BagsListProps {
	bags: IBag[]
	onOrder: (bag: IBag) => void
	onDelete: (bagId: string) => void
}

export const BagsList: FC<BagsListProps> = ({ bags, onOrder, onDelete }) => {
	return (
		<div className='flex flex-col gap-8'>
			{bags.map(bag => (
				<BagItem
					key={bag.id}
					bag={bag}
					onOrder={onOrder}
					onDelete={onDelete}
				/>
			))}
		</div>
	)
}
