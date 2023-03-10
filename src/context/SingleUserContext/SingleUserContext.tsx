import { useContext, useReducer, createContext } from "react"
import { SingleUserReducer } from "./SingleUserReducer"
import type { initialUserState, SingleUserContextType } from "../context-types"
import { SET_SINGLE_USER, SET_LOADING, STOP_LOADING, SET_ERROR } from "../actions"
import axios, { AxiosError } from "axios"
import { getLocalItem } from "../../utils/getLocalItem"
const initialState: initialUserState = {
	pending: false,
	error_message: "",
	error: false,
	current_user_id: "",
	current_user: {
		createdAt: "",
		orgName: "",
		userName: "",
		email: "",
		phoneNumber: "",
		lastActiveDate: "",
		profile: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			gender: "",
			address: "",
			avatar: "",
			bvn: "",
			currency: "",
		},
		guarantor: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			gender: "",
			address: "",
		},
		accountBalance: "",
		accountNumber: "",
		socials: {
			facebook: "",
			instagram: "",
			twitter: "",
		},
		education: {
			level: "",
			employmentStatus: "",
			sector: "",
			duration: "",
			officeEmail: "",
			monthlyIncome: [],
			loanRepayment: "",
		},
		id: "",
		status: "",
	},
}
export const SingleUserContext = createContext<SingleUserContextType>(initialState)
const base_url = import.meta.env.VITE_API_BASE_URL

export const SingleUserProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(SingleUserReducer, initialState)

	const getSingleUser = async (id: string) => {
		const data = getLocalItem(id)
		if (data) {
			dispatch({ type: SET_SINGLE_USER, payload: data })
			return
		}
		dispatch({ type: SET_LOADING })

		try {
			const { data } = await axios(`${base_url}/${id}`)
			localStorage.setItem(id, JSON.stringify(data))
			dispatch({ type: SET_SINGLE_USER, payload: data })
			dispatch({ type: STOP_LOADING })
		} catch (error) {
			dispatch({ type: STOP_LOADING })
			const message = error instanceof AxiosError ? error?.message : "Something went wrong"
			dispatch({ type: SET_ERROR, payload: message })
		}
	}
	const clearUser = () => {
		dispatch({
			type: SET_SINGLE_USER,
			payload: {
				createdAt: "",
				orgName: "",
				userName: "",
				email: "",
				phoneNumber: "",
				lastActiveDate: "",
				profile: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
					gender: "",
					address: "",
					avatar: "",
					bvn: "",
					currency: "",
				},
				guarantor: {
					firstName: "",
					lastName: "",
					phoneNumber: "",
					gender: "",
					address: "",
				},
				accountBalance: "",
				accountNumber: "",
				socials: {
					facebook: "",
					instagram: "",
					twitter: "",
				},
				education: {
					level: "",
					employmentStatus: "",
					sector: "",
					duration: "",
					officeEmail: "",
					monthlyIncome: [],
					loanRepayment: "",
				},
				id: "",
				status: "",
			},
		})
	}

	return (
		<SingleUserContext.Provider
			value={{
				...state,
				getSingleUser,
				clearUser,
			}}
		>
			{children}
		</SingleUserContext.Provider>
	)
}

export const useSingleUserContext = () => useContext(SingleUserContext)
