import { useEffect } from "react"

interface clickAway {
	ref: React.RefObject<HTMLElement>
	condition: boolean
	handleClickOutside: () => void
}

const useClickAway = ({ ref, condition, handleClickOutside }: clickAway) => {
	useEffect(() => {
		const clickAway = (e: MouseEvent) => {
			if (condition && ref.current && !ref.current.contains(e.target as Node)) {
				handleClickOutside()
			}
		}
		document.addEventListener("mousedown", clickAway)
		return () => {
			document.removeEventListener("mousedown", clickAway)
		}
	}, [ref, condition])
}

export default useClickAway
