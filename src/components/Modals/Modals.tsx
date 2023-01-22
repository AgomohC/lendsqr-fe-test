import ReactDOM from "react-dom"
import { useModalContext } from "../../context/ModalContext/ModalContext"
import "../../styles/modal.scss"
import ModalActions from "./ModalActions"
import ModalFilters from "./ModalFilters"
import { useRef } from "react"
import useClickAway from "../../hooks/useClickAway"

const Modals = () => {
	const { isModalOpen, modal_offset, modalType, closeModal } = useModalContext()

	const modalStyles =
		modalType === "user_details"
			? {
					left: modal_offset?.left ? modal_offset?.left - 150 : 0,
					top: modal_offset?.top ? modal_offset?.top + window.scrollY : 0,
			  }
			: modalType === "user_filters"
			? {
					left: modal_offset?.left ? modal_offset?.left : 0,
					top: modal_offset?.top ? modal_offset?.top + window.scrollY : 0,
			  }
			: undefined
	const modalRef = useRef<HTMLDivElement>(null)
	useClickAway({
		ref: modalRef,
		condition: isModalOpen,
		handleClickOutside: closeModal,
	})
	if (!isModalOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div
			style={modalStyles}
			className='modal'
			ref={modalRef}
		>
			{modalType === "user_details" ? (
				<ModalActions />
			) : modalType === "user_filters" ? (
				<ModalFilters />
			) : null}
		</div>,
		document.getElementById("portals") as HTMLElement
	)
}

export default Modals
