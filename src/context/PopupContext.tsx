import { ReactNode, createContext, useCallback, useState } from 'react'

type TPopup = 'confirm' | (string & {})

export interface PopupProps {
	customTitle?: string
	content: string
	type: TPopup
	callback: () => void | Promise<void>
}

export interface PopupContextProps extends PopupProps {
	openPopup: (props: PopupProps) => void
	closePopup: (isConfirmed: boolean) => void
}

export const PopupContext = createContext<PopupContextProps>({
	customTitle: '',
	content: '',
	type: 'confirm',
	callback() {},
	openPopup() {},
	closePopup() {},
})

const initialPopup: PopupProps = {
	customTitle: '',
	content: '',
	type: 'confirm',
	callback() {},
}

export const PopupProvider = ({ children }: { children: ReactNode }) => {
	const [props, setProps] = useState<PopupProps>(initialPopup)

	const openPopup = useCallback(
		(props: PopupProps) => {
			setProps(props)
		},
		[props]
	)

	const closePopup = useCallback(
		(isConfirmed: boolean) => {
			setProps({ ...initialPopup, content: '' })
			if (isConfirmed) {
				props.callback()
			}
		},
		[props]
	)

	return (
		<PopupContext.Provider
			value={{
				...props,
				openPopup,
				closePopup,
			}}
		>
			{children}
		</PopupContext.Provider>
	)
}
