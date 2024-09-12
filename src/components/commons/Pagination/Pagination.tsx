import { Button, Text } from '@/components/elements'

interface PaginationProps {
	total: number
	limit: number
	currentPage: number
	nextPage?: () => void
	previousPage?: () => void
}

export const Pagination = ({ total, limit, currentPage, previousPage, nextPage }: PaginationProps) => {
	return (
		<div className='flex-ver justify-end md:justify-between bg-white p-4'>
			<Text
				variant={'secondary-regular'}
				level={'h7'}
				className='hidden md:block'
			>
				Showing {(currentPage - 1) * limit + 1} to {currentPage * limit} of {total} results
			</Text>

			<div className='flex gap-4'>
				<Button
					variant={'secondary'}
					styleType={'outlined'}
					onClick={previousPage}
					className={`py-2 px-4 text-sm ${currentPage === 1 ? 'text-gray-500' : ''}`}
					disabled={currentPage === 1}
				>
					Previous
				</Button>
				<Button
					variant={'secondary'}
					styleType={'outlined'}
					onClick={nextPage}
					className={`py-2 px-4 text-sm ${currentPage * limit >= total ? 'text-gray-500' : ''}`}
					disabled={currentPage * limit >= total}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
