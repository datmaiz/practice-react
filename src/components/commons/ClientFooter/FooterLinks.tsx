import { INavigation } from '@/common/interfaces'
import { Text } from '@/components/elements'
import { Link } from 'react-router-dom'

export const FooterLinks = ({ title, links }: { title: string; links: INavigation[] }) => {
	return (
		<div className='flex flex-col gap-[34px]'>
			<Text level={'h7'}>{title}</Text>
			<ul className='flex flex-col gap-4'>
				{links.map(link => (
					<li key={link.path}>
						<Link
							className='text-sm'
							to={link.path}
						>
							{link.text}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
