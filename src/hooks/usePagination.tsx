import { useCallback, useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePagination = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState(+(searchParams.get('page') ?? 1))

	const nextPage = useCallback(() => {
		setCurrentPage(currentPage + 1)
		setSearchParams(
			params => {
				params.set('page', (currentPage + 1).toString())
				return params
			},
			{ replace: true }
		)
	}, [currentPage])

	const previousPage = useCallback(() => {
		setCurrentPage(currentPage - 1)
		setSearchParams(
			params => {
				params.set('page', (currentPage - 1).toString())
				return params
			},
			{ replace: true }
		)
	}, [currentPage])

	useLayoutEffect(() => {
		if (!searchParams.get('page')) {
			setSearchParams(
				params => {
					params.set('page', '1')
					return params
				},
				{ replace: true }
			)
		}
	}, [])

	return {
		currentPage,
		nextPage,
		previousPage,
	}
}
