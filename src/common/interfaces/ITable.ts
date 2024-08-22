import { CSSProperties, ReactNode } from 'react'

export interface ITableColumn<T = object> {
	key: Extract<keyof T, string>
	title: string
	_style?: CSSProperties
	_className?: string
	render?: (row: T) => ReactNode
}

export interface ITable<T = object> {
	columns: ITableColumn<T>[]
	rows: T[]
	rowKey: Extract<keyof T, string>
	_rowClassName?: string
}
