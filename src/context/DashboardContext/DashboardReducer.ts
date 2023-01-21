import type { initialDashboardState, action, User } from "../context-types"
import {
	SET_ALL_USERS,
	SET_SINGLE_USER,
	SET_LOADING,
	STOP_LOADING,
	SET_ERROR,
	SET_HITS,
} from "../actions"

export const DashboardReducer = (
	state: initialDashboardState,
	action: action<any>
): initialDashboardState => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, error: false, pending: true }
		case STOP_LOADING:
			return { ...state, error: false, pending: false }
		case SET_ERROR:
			return { ...state, error: true, pending: false, error_message: action.payload }
		case SET_ALL_USERS:
			const users = action.payload?.map((single_user: User) => {
				single_user.status = "inactive"
				return single_user
			})
			return { ...state, users }
		case SET_HITS:
			return { ...state, hits_per_page: action.payload }
		default:
			return state
	}
}
