import type { initialModalState, action, User } from "../context-types"
import { OPEN_MODAL, CLOSE_MODAL } from "../actions"

export const ModalReducer = (state: initialModalState, action: action<any>): initialModalState => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				isModalOpen: true,
				modalDetails: action.payload.user,
				modalType: action.payload.modalType,
				modal_offset: action.payload.modal_offset,
			}
		case CLOSE_MODAL:
			return {
				...state,
				isModalOpen: false,
				modalDetails: undefined,
				modalType: undefined,
				modal_offset: undefined,
			}
		default:
			return state
	}
}
