import { Text } from '@/components/elements'
import { ClientContainer } from '..'
import { FooterSocials } from './FooterSocials'
import { FooterLinks } from './FooterLinks'
import { INavigation } from '@/common/interfaces'
import { FooterBlog } from './FooterBlog'

const shoppingLinks: INavigation[] = [
	{
		path: '/cart',
		text: 'Your cart',
	},
	{
		path: '/orders',
		text: 'Your orders',
	},
	{
		path: '/compared-items',
		text: 'Compared items',
	},
	{
		path: '/wihshlist-items',
		text: 'Whishlist items',
	},
	{
		path: '/shopping-details',
		text: 'Shopping details',
	},
]

const moreLinks: INavigation[] = [
	{
		path: '/blog',
		text: 'Blog',
	},
	{
		path: '/gift-center',
		text: 'Gift Center',
	},
	{
		path: '/buying-guides',
		text: 'Buying Guides',
	},
	{
		path: '/new-arrivals',
		text: 'New Arrivals',
	},
	{
		path: '/clearance',
		text: 'Clearance',
	},
]

export const ClientFooter = () => {
	return (
		<footer className='bg-black-600'>
			<ClientContainer>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 sm:gap-8 text-white py-[50px]'>
					<div className='flex flex-col gap-[55px]'>
						<div className='flex flex-col gap-10'>
							<Text
								variant={'primary-bold'}
								level={'h3'}
							>
								URBAN OUTFITTERS
							</Text>
							<Text
								variant={'primary-regular'}
								level={'h7'}
								className='text-white/50'
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
							</Text>
							<div className='flex flex-col gap-2'>
								<Text level={'h7'}>121 king street, Melbourne 3000</Text>
								<Text level={'h7'}>+61 3 8376 6284</Text>
								<Text level={'h7'}>contact@urbanoutfitters.com</Text>
							</div>
						</div>
						<FooterSocials />
					</div>
					<FooterLinks
						title='SHOPPING'
						links={shoppingLinks}
					/>
					<FooterLinks
						title='MORE LINK'
						links={moreLinks}
					/>
					<div className='flex flex-col'>
						<Text
							level={'h7'}
							className='pb-[25px]'
						>
							FROM THE BLOG
						</Text>
						<FooterBlog day={26} />
						<div className='py-[34px] before:w-full before:block before:h-[1px] before:bg-white/50'></div>
						<FooterBlog day={27} />
					</div>
				</div>
			</ClientContainer>
			<Text
				variant={'primary-light'}
				level={'h8'}
				className='text-white text-center py-[18px] bg-black-700'
			>
				Urban Outfitters © – All rights reserved{' '}
			</Text>
		</footer>
	)
}
