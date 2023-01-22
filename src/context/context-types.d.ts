export type action<T> = { type: string; payload?: T }

interface actionCreatorType {
	[index: string]: any
}

interface Person {
	firstName: string
	lastName: string
	phoneNumber: string
	gender: string
	address: string
}
interface Profile extends Person {
	avatar: string
	bvn: string
	currency: string
}
interface Education {
	level: string
	employmentStatus: string
	sector: string
	duration: string
	officeEmail: string
	monthlyIncome: Array<string>
	loanRepayment: string
}

interface Socials {
	facebook: string
	instagram: string
	twitter: string
}
export type User = {
	createdAt: string
	orgName: string
	userName: string
	email: string
	phoneNumber: string
	lastActiveDate: string
	profile: Profile
	guarantor: Person
	accountBalance: string
	accountNumber: string
	socials: Socials
	education: Education
	id: string
	status: string
}

export type initialDashboardState = {
	pending: boolean
	error: boolean
	error_message: string
	users: User[]
	hits_per_page: number
}

export enum modal_types {
	user_details = "user_details",
	user_filters = "user_filters",
}

export type initialModalState = {
	isModalOpen: boolean
	modalType: modal_types | undefined
	modalDetails?: User
	modal_offset: { left: number; top: number } | undefined
}
export type initialUserState = {
	pending: boolean
	error: boolean
	current_user: User
	current_user_id: string
	error_message: string
}

export type ModalContextType = initialModalState & actionCreatorType

export type DashboardContextType = initialDashboardState & actionCreatorType

export type SingleUserContextType = initialUserState & actionCreatorType
