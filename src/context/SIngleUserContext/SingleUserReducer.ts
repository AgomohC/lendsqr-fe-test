import type { initialUserState } from "./SingleUserContext"
import type { action } from "../DashboardContext/DashboardContext"

export const SingleUserReducer = (
	state: initialUserState,
	action: action<any>
): initialUserState => {
	switch (action.type) {
		default:
			return state
	}
}
