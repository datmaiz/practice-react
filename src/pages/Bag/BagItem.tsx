import { FC } from 'react'

import { IBag } from '@/common/interfaces'
import { Button, Image, Text } from '@/components/elements'
import { numberToCurrency } from '@/utils'
import { CloseIcon } from '@/assets/icons/outlined'

interface BagItemProps {
	bag: IBag
	onOrder: (bag: IBag) => void
	onDelete: (bagId: string) => void
}

export const BagItem: FC<BagItemProps> = ({ bag, onOrder, onDelete }) => {
	return (
		<div className='flex gap-5 p-4 border rounded-lg'>
			<Image
				src={bag.thumb}
				alt={bag.name}
				containerClassName='max-w-[150px] aspect-[2/3] border'
			/>
			<div className='flex flex-col flex-1 justify-between'>
				<div className='flex-ver justify-between'>
					<div>
						<Text
							variant={'primary-regular'}
							level={'h7'}
						>
							{bag.name}
						</Text>
						<Text
							variant={'primary-regular'}
							level={'h6'}
							className='pt-4'
						>
							{numberToCurrency(bag.price)}
						</Text>
					</div>
					<CloseIcon
						width={16}
						height={16}
						onClick={() => onDelete(bag.id)}
						className='cursor-pointer'
					/>
				</div>
				<div className='flex-ver justify-between'>
					<div className='flex gap-[46px]'>
						<div className='flex gap-[18px]'>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Quantity:
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Color:
								</Text>
							</div>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{bag.quantity}
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{bag.color}
								</Text>
							</div>
						</div>
						<div className='flex gap-[18px]'>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Size:
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									Total:
								</Text>
							</div>
							<div>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{bag.size}
								</Text>
								<Text
									variant={'primary-light'}
									level={'h8'}
								>
									{numberToCurrency(bag.quantity * bag.price)}
								</Text>
							</div>
						</div>
					</div>
					<Button
						onClick={() => onOrder(bag)}
						className='px-6 py-4'
					>
						Order
					</Button>
				</div>
			</div>
		</div>
	)
}
