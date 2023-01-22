import Table from "../components/Table"
import "../styles/dashboard.scss"
import CardLayout from "../components/CardLayout"
import { parseDateTime } from "../utils/parse-date-time"
import { useMemo, useEffect } from "react"
import type { User } from "../context/context-types"
import { useDashboardContext } from "../context/DashboardContext/DashboardContext"
import { useModalContext } from "../context/ModalContext/ModalContext"

const Dashboard = () => {
	const {
		error,
		pending,
		error_message,
		users: data,
		fetchAllUsers,
		hits_per_page,
	} = useDashboardContext()
	const { openModal } = useModalContext()
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
				clickHandler: React.MouseEventHandler<SVGSVGElement>
		  }[][]
		| undefined = useMemo(
		() =>
			data?.map(user => [
				{
					label: user.userName,
					clickHandler: event => {
						event.stopPropagation()
						openModal({
							user,
							modalType: "user_details",
							modal_offset: { top: event.clientY, left: event.clientX },
						})
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
				hitsPerPage={hits_per_page}
			/>
		</div>
	)
}

export default Dashboard
