import { useContext, useReducer, createContext } from "react"
import { DashboardReducer } from "./DashboardReducer"

export type initialDashboardState = {}
export type action<T> = { type: string; payload: T }

const initialState: initialDashboardState = {}
export const DashboardContext = createContext(initialState)

export const DashboardProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(DashboardReducer, initialState)

	// Define action creators here

	return (
		<DashboardContext.Provider
			value={{
				...state,
				// list action creators here
			}}
		>
			{children}
		</DashboardContext.Provider>
	)
}

export const useDashboardContext = () => useContext(DashboardContext)
