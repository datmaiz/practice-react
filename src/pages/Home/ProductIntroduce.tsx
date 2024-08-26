import { TerracotaVase, VintageChair } from '@/assets/images'
import { ClientContainer } from '@/components/commons'
import { Button, Text } from '@/components/elements'

export const ProductIntroduce = () => {
	return (
		<ClientContainer>
			<section className='flex justify-between gap-6 pt-6'>
				<figure className='flex-ver bg-gray-100'>
					<img
						src={VintageChair}
						alt='vintage chair'
					/>
					<figcaption>
						<Text level={'h3'}>INY VINTAGE CHAIR</Text>
						<Button
							styleType={'outlined'}
							className='p-4'
						>
							view details
						</Button>
					</figcaption>
				</figure>
				<figure className='flex-ver bg-[#EAE9E7]'>
					<img
						src={TerracotaVase}
						alt='terracota vase'
					/>
					<figcaption>
						<Text level={'h3'}>LARGE TERRACOTA VASE</Text>
						<Button
							styleType={'outlined'}
							className='p-4'
						>
							view details
						</Button>
					</figcaption>
				</figure>
			</section>
		</ClientContainer>
	)
}
