import type { initialDashboardState, action } from "./DashboardContext"

export const DashboardReducer = (
	state: initialDashboardState,
	action: action<any>
): initialDashboardState => {
	switch (action.type) {
		default:
			return state
	}
}
