import { NotificationIcon } from '@/assets/icons/outlined'
import { ChangeEvent, useState } from 'react'

export const AdminSideBarHeader = () => {
	const [searchText, setSearchText] = useState<string>('')

	const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setSearchText(value)
	}

	return (
		<header className='flex-ver justify-end px-5 py-3'>
			<div className='flex-ver gap-[27px]'>
				<input
					value={searchText}
					onChange={handleSearchTextChange}
					type='text'
					placeholder='Search...'
					className='border border-gray-500 font-secondary-400 px-4 py-[10px] rounded-lg outline-none'
				/>
				<NotificationIcon
					width={25}
					height={25}
					className='text-gray-500 cursor-pointer'
				/>
			</div>
		</header>
	)
}
