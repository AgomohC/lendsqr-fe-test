import Table from "../components/Table"
import "../styles/dashboard.scss"
import CardLayout from "../components/CardLayout"
import { parseDateTime } from "../utils/parse-date-time"
import { useMemo, useEffect } from "react"
import { ReactComponent as Dots } from "../assets/icons/dots-menu.svg"
import type { User } from "../context/context-types"
import { useDashboardContext } from "../context/DashboardContext/DashboardContext"

const statuses = ["active", "blacklisted", "inactive", "pending"]

const Dashboard = () => {
	const { error, pending, error_message, users: data, fetchAllUsers } = useDashboardContext()

	useEffect(() => {
		fetchAllUsers()
	}, [])
	type TableFields = {
		[index: string]: string
	}
	let users: TableFields[] = data
		? data?.map((datum: User) => {
				return {
					organization: datum?.orgName,
					username: datum?.profile.firstName + " " + datum?.profile.lastName,
					email: datum?.email,
					"phone number": datum?.phoneNumber,
					"date joined": parseDateTime(datum?.createdAt),
				}
		  })
		: []
	let extra_elements:
		| {
				content: string
				className: string
		  }[]
		| undefined = useMemo(
		() =>
			data?.map((datum: User) => {
				return {
					content: datum?.status,
					className: `table__chips--${datum?.status}`,
				}
			}),
		[data]
	)

	let action_buttons:
		| {
				label: string | JSX.Element
				clickHandler: (e: React.MouseEvent<HTMLElement>) => void
		  }[][]
		| undefined = useMemo(
		() =>
			users.map(user => [
				{
					label: <Dots />,
					clickHandler: (e: React.MouseEvent<HTMLElement>) => {
						e.stopPropagation()
					},
				},
			]),
		[data]
	)
	return (
		<div className='layout'>
			<h4 className='layout__heading'>Users</h4>
			<CardLayout />
			<Table
				data={users}
				pending={pending}
				extraElementName={"status"}
				extraElements={extra_elements}
				tableActionButtons={action_buttons}
			/>
		</div>
	)
}

export default Dashboard
