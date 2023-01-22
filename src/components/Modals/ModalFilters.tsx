import { useDashboardContext } from "../../context/DashboardContext/DashboardContext"
import { useModalContext } from "../../context/ModalContext/ModalContext"
import "../../styles/modal.scss"
import Input from "../Input"

const ModalFilters = () => {
	return (
		<div className='modal__filters'>
			<Input
				type='select'
				placeholder='Select'
				label='Organization'
			/>
			<Input
				type='text'
				placeholder='User'
				label='Username'
			/>
			<Input
				type='email'
				placeholder='Email'
				label='Email'
			/>
			<Input
				type='date'
				placeholder='Date'
				label='Date'
			/>
			<Input
				type='text'
				placeholder='Phone Number'
				label='Phone Number'
			/>
			<Input
				type='select'
				placeholder='Select'
				label='Status'
			/>
			<div className='modal__filterBtns'>
				<button className='modal__filterBtn--muted'>Reset</button>
				<button className='modal__filterBtn--green'>Filter</button>
			</div>
		</div>
	)
}

export default ModalFilters
