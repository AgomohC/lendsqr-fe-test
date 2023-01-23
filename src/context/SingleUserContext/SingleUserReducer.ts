import type { action, initialUserState } from "../context-types"
import { SET_SINGLE_USER, SET_LOADING, STOP_LOADING, SET_ERROR } from "../actions"
export const SingleUserReducer = (
	state: initialUserState,
	action: action<any>
): initialUserState => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, error: false, pending: true }
		case STOP_LOADING:
			return { ...state, error: false, pending: false }
		case SET_ERROR:
			return { ...state, error: true, pending: false, error_message: action.payload }
		case SET_SINGLE_USER:
			return { ...state, current_user: action.payload }
		default:
			return state
	}
}
