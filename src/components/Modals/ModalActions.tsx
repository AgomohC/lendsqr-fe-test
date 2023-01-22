import { useModalContext } from "../../context/ModalContext/ModalContext"
import { ReactComponent as Activate } from "../../assets/icons/activate.svg"
import { ReactComponent as BlackList } from "../../assets/icons/blacklist.svg"
import { ReactComponent as Details } from "../../assets/icons/view-details.svg"
import "../../styles/modal.scss"
import { useNavigate } from "react-router-dom"
import { useDashboardContext } from "../../context/DashboardContext/DashboardContext"

const ModalActions = () => {
	const { modalDetails, closeModal } = useModalContext()
	const { changeUserStatus } = useDashboardContext()
	const navigate = useNavigate()

	return (
		<div className='modal__actions'>
			<button
				onClick={() => {
					closeModal()
					navigate(`/dashboard/${modalDetails?.id}`)
				}}
			>
				<Details /> <p>View Details</p>
			</button>
			<button
				onClick={() => {
					closeModal()
					changeUserStatus({ id: modalDetails?.id, new_status: "blacklisted" })
				}}
			>
				<BlackList /> <p>BlackList User</p>
			</button>
			<button
				onClick={() => {
					closeModal()
					changeUserStatus({ id: modalDetails?.id, new_status: "active" })
				}}
			>
				<Activate /> <p>Activate User</p>
			</button>
		</div>
	)
}

export default ModalActions
