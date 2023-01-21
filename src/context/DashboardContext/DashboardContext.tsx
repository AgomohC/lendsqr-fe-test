import { useContext, useReducer, createContext } from "react"
import { DashboardReducer } from "./DashboardReducer"
import axios, { AxiosError } from "axios"
import type { ContextType, initialDashboardState } from "../context-types"
import {
	SET_ALL_USERS,
	SET_SINGLE_USER,
	SET_LOADING,
	STOP_LOADING,
	SET_ERROR,
	SET_HITS,
} from "../actions"

const initialState: initialDashboardState = {
	pending: false,
	error: false,
	error_message: "",
	users: [],
	hits_per_page: 20,
}
export const DashboardContext = createContext<ContextType>({
	...initialState,
})

const base_url = "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"

export const DashboardProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(DashboardReducer, initialState)

	const setHits = (hits: number) => {
		dispatch({ type: SET_HITS, payload: hits })
	}

	const fetchAllUsers = async () => {
		dispatch({ type: SET_LOADING })
		try {
			const { data } = await axios(base_url)
			dispatch({ type: SET_ALL_USERS, payload: data })
			dispatch({ type: STOP_LOADING })
		} catch (error) {
			dispatch({ type: STOP_LOADING })
			const message = error instanceof AxiosError ? error?.message : "Something went wrong"
			dispatch({ type: SET_ERROR, payload: message })
		}
	}

	return (
		<DashboardContext.Provider value={{ ...state, fetchAllUsers, setHits }}>
			{children}
		</DashboardContext.Provider>
	)
}

export const useDashboardContext = () => useContext(DashboardContext)
