import { FunctionComponent, SVGProps } from 'react'

export interface INavigation {
	path: string
	text: string
	icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>
}
