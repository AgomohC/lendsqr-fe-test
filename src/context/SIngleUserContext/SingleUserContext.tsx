import { useContext, useReducer, createContext } from "react"
import type { action } from "../DashboardContext/DashboardContext"
import { SingleUserReducer } from "./SingleUserReducer"
export type initialUserState = {}
const initialState: initialUserState = {}

export const SingleUserContext = createContext(initialState)

export const SingleUserProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(SingleUserReducer, initialState)

	// Define action creators here

	return (
		<SingleUserContext.Provider
			value={{
				...state,
				// list action creators here
			}}
		>
			{children}
		</SingleUserContext.Provider>
	)
}

export const useDashboardContext = () => useContext(SingleUserContext)
