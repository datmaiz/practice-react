import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

import { IBreadcrumb } from '@/common/interfaces'
import { Text } from '@/components/elements'

export const Breadcrumb = memo(({ breadcrumbs }: { breadcrumbs: IBreadcrumb[] }) => {
	return (
		<div className='flex-ver gap-1'>
			{breadcrumbs.map((item, index) => (
				<Fragment key={item.path}>
					<Text
						level={'h6'}
						variant={'primary-regular'}
						className='hover:underline'
					>
						<Link to={item.path}>{item.title.toLowerCase()}</Link>
					</Text>
					{index !== breadcrumbs.length - 1 ? ' / ' : ''}
				</Fragment>
			))}
		</div>
	)
})
