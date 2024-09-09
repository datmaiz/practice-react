import { Children } from 'react'

import { ITable } from '@/common/interfaces'
import cn from '@/utils/cn'

interface AutomaticTableProps<T> extends ITable<T> {
	isLoading?: boolean
	loadingRows?: number
}

export const AutomaticTable = <T,>({
	columns,
	rows,
	rowKey,
	_rowClassName,
	loadingRows = 5,
	isLoading = false,
}: AutomaticTableProps<T>) => {
	return (
		<table className='w-full table-auto border-spacing-y-[10px] border-separate'>
			<thead>
				<tr className='text-left font-secondary-600 text-gray-600'>
					{Children.toArray(
						columns.map(col => (
							<th
								style={col._style}
								className={cn('p-4', col._className)}
							>
								{col.title}
							</th>
						))
					)}
				</tr>
			</thead>
			<tbody>
				{isLoading &&
					new Array(loadingRows).fill(0).map((_, index) => (
						<tr
							className={_rowClassName}
							key={index}
						>
							{Children.toArray(
								columns.map(col => (
									<td
										style={col._style}
										className='p-4'
									>
										<div
											style={col._style}
											className={cn('size-full bg-gray-500 animate-pulse', col._className)}
										></div>
									</td>
								))
							)}
						</tr>
					))}
				{rows.map(row => (
					<tr
						className={_rowClassName}
						key={row[rowKey] as string | number}
					>
						{Children.toArray(
							columns.map(col => {
								const cell = row[col.key]
								if (typeof cell === 'number' || typeof cell === 'string') {
									return (
										<td
											style={col._style}
											className={cn('p-4')}
										>
											{col.render ? col.render(row) : cell}
										</td>
									)
								} else {
									return (
										<td
											style={col._style}
											className={cn('p-4')}
										>
											{col.render?.(row)}
										</td>
									)
								}
							})
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}
