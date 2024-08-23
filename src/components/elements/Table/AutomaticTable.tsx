import { Children } from 'react'

import { ITable } from '@/common/interfaces'
import cn from '@/utils/cn'

export const AutomaticTable = <T,>({ columns, rows, rowKey, _rowClassName }: ITable<T>) => {
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
											className={cn('p-4', col._className)}
										>
											{col.render ? col.render(row) : cell}
										</td>
									)
								} else {
									return (
										<td
											style={col._style}
											className={cn('p-4', col._className)}
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
