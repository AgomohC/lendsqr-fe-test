import { useContext, useReducer, createContext } from "react"
import { DashboardReducer } from "./DashboardReducer"
import axios, { AxiosError } from "axios"
import type { DashboardContextType, initialDashboardState } from "../context-types"
import {
	SET_ALL_USERS,
	SET_LOADING,
	STOP_LOADING,
	SET_ERROR,
	SET_HITS,
	CHANGE_USER_STATUS,
} from "../actions"
import { getLocalItem } from "../../utils/getLocalItem"

const initialState: initialDashboardState = {
	pending: false,
	error: false,
	error_message: "",
	users: getLocalItem("users") ? getLocalItem("users") : [],
	hits_per_page: 10,
}
export const DashboardContext = createContext<DashboardContextType>({
	...initialState,
})

const base_url = import.meta.env.VITE_API_BASE_URL

export const DashboardProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(DashboardReducer, initialState)

	const setHits = (hits: number) => {
		dispatch({ type: SET_HITS, payload: hits })
	}

	const fetchAllUsers = async () => {
		dispatch({ type: SET_LOADING })
		if (state.users.length > 0) {
			dispatch({ type: STOP_LOADING })
			return
		}
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
	const changeUserStatus = (details: { new_status: string; id: string }) => {
		const data = getLocalItem(details?.id)
		if (data) {
			data.status = details.new_status
			localStorage.setItem(details.id, JSON.stringify(data))
		}
		dispatch({ type: CHANGE_USER_STATUS, payload: details })
	}

	return (
		<DashboardContext.Provider value={{ ...state, fetchAllUsers, setHits, changeUserStatus }}>
			{children}
		</DashboardContext.Provider>
	)
}

export const useDashboardContext = () => useContext(DashboardContext)
