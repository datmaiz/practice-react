import { ReactNode, createContext, useCallback, useState } from 'react'

export type PopupProps = {
	customTitle?: string
	content: string
} & (TConfirmPopup | TInfoPopup)

export type PopupType = TConfirmPopup | TInfoPopup

export type PopupContextProps = {
	openPopup: (props: PopupProps) => void
	closePopup: (isConfirmed: boolean) => void
} & PopupProps

export const PopupContext = createContext<PopupContextProps>({
	customTitle: '',
	content: '',
	type: 'confirm',
	callback() {},
	openPopup() {},
	closePopup() {},
})

type TConfirmPopup = {
	type: 'confirm'
	callback: () => void | Promise<void>
}

type TInfoPopup = {
	type: 'info'
}

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
			if (isConfirmed && props.type === 'confirm') {
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
