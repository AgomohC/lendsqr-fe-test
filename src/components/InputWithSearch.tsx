import { ReactComponent as Search } from "../assets/icons/search.svg"
import "../styles/input.scss"
import { useEffect } from "react"
type InputProps = {
	placeholder: string
}

const InputWithSearch = ({ placeholder }: InputProps) => {
	useEffect(() => {}, [])
	return (
		<div className='search-cont'>
			<div className='search-cont__container'>
				<input
					type='text'
					placeholder={placeholder}
					className='search-cont__input'
				/>
			</div>
			<div className='search-cont__icon'>
				<Search />
			</div>
		</div>
	)
}

export default InputWithSearch
