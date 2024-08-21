import { FC, ReactNode, memo } from 'react'

interface ModalProps {
	children: ReactNode
	isShown: boolean
	onClose: () => void
}

export const Modal: FC<ModalProps> = memo(({ children }) => {
	return <div className='fixed inset-0 backdrop-blur-[10px] flex-center'>{children}</div>
})
