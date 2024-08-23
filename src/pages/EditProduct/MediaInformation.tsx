import { CloseIcon } from '@/assets/icons/outlined'
import { IProduct } from '@/common/interfaces'
import { Image, Text } from '@/components/elements'
import { ChangeEvent } from 'react'

interface MediaInformationProps {
	product: IProduct
	images: string[]
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
	onDeleteImage: (image: string) => void
}

export const MediaInformation = ({ product, images, onDeleteImage, onInputChange }: MediaInformationProps) => {
	return (
		<section className='pb-4 shrink-0'>
			<div className='flex flex-col gap-4 border border-gray-500 rounded-lg p-4'>
				<Text
					variant={'secondary-semi'}
					level={'h5'}
				>
					Media information:
				</Text>
				<Text
					variant={'secondary-semi'}
					level={'h8'}
				>
					Product images:
				</Text>
				<div className='flex-ver gap-4 border border-gray-300 p-3 rounded-lg'>
					<label
						className='flex-center border border-secondary border-dashed aspect-square w-[130px] rounded-xl cursor-pointer shrink-0'
						htmlFor='image-picker'
					>
						<Text
							variant={'secondary-semi'}
							level={'h8'}
							className='text-secondary'
						>
							Click to upload
						</Text>
						<input
							type='file'
							id='image-picker'
							hidden
							onChange={onInputChange}
						/>
					</label>
					<ul className='flex gap-4 flex-1 overflow-auto'>
						{[...product.images, ...images].map(image => (
							<div
								key={image}
								className='relative shrink-0 w-[130px] aspect-square'
							>
								<CloseIcon
									onClick={() => onDeleteImage(image)}
									className='absolute top-2 right-2 cursor-pointer'
								/>
								<Image src={image} />
							</div>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
