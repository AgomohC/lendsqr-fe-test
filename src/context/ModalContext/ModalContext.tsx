import { useContext, useReducer, createContext } from "react"
import { ModalReducer } from "./ModalReducer"
import type { ModalContextType, initialModalState, User, modal_types } from "../context-types"
import { CLOSE_MODAL, OPEN_MODAL } from "../actions"

const initialState: initialModalState = {
	isModalOpen: false,
	modalType: undefined,
	modalDetails: undefined,
	modal_offset: undefined,
}
export const ModalContext = createContext<ModalContextType>({
	...initialState,
})

export const ModalProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(ModalReducer, initialState)

	const openModal = (details: {
		user?: User
		modalType: modal_types
		modal_offset: { top: number; left: number }
	}) => {
		dispatch({ type: OPEN_MODAL, payload: details })
	}
	const closeModal = () => {
		dispatch({ type: CLOSE_MODAL })
	}
	return (
		<ModalContext.Provider value={{ ...state, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	)
}

export const useModalContext = () => useContext(ModalContext)
