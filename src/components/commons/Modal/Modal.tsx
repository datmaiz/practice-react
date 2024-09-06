import { FC, MouseEvent, ReactNode, memo } from 'react'

interface ModalProps {
	children: ReactNode
	isShown: boolean
	onClose: () => void
}

export const Modal: FC<ModalProps> = memo(({ children }) => {
	const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		if (e.target === e.currentTarget) close()
	}

	return (
		<div
			onClick={handleClick}
			className='fixed inset-0 backdrop-blur-[10px] flex-center'
		>
			{children}
		</div>
	)
})
