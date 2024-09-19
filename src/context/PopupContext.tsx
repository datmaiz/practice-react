import { ReactNode, createContext, useCallback, useState } from 'react'

const noop = () => {}

export type PopupProps = {
	customTitle?: string
	content: string
} & (TConfirmPopup | TInfoPopup)

export type PopupType = TConfirmPopup | TInfoPopup

export type PopupContextProps = {
	openPopup: (props: PopupProps) => void
	closePopup: (closeProps: TCloseFunctionProps) => void
} & PopupProps

export const PopupContext = createContext<PopupContextProps>({
	customTitle: '',
	content: '',
	type: 'confirm',
	callback: noop,
	openPopup: noop,
	closePopup: noop,
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
	callback: noop,
}

type TCloseConfirmFunctionProps = {
	type: 'confirm'
	isConfirm: boolean
}

type TCloseInfoFunctionProps = {
	type: 'info'
}

type TCloseFunctionProps = TCloseConfirmFunctionProps | TCloseInfoFunctionProps

export const PopupProvider = ({ children }: { children: ReactNode }) => {
	const [props, setProps] = useState<PopupProps>(initialPopup)

	const openPopup = useCallback(
		(props: PopupProps) => {
			setProps(props)
		},
		[props]
	)

	const closePopup = useCallback(
		(closeProps: TCloseFunctionProps) => {
			setProps({ ...initialPopup, content: '' })
			if (closeProps.type === 'confirm' && closeProps.isConfirm && props.type === 'confirm') {
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
