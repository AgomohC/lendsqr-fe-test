import "../styles/input.scss"
import { useState } from "react"
type InputProps = {
	placeholder: string
	type: "text" | "password" | "email"
	label?: string
	className?: string
	isAuth?: true
}

const Input = ({ placeholder, type, label, isAuth }: InputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	const modifiedType = (type: string) => {
		if (type !== "password") {
			return type
		}
		return showPassword ? "text" : "password"
	}
	return (
		<div className='input-cont'>
			<label className='input-cont__label'>{label}</label>
			<div className='input-cont__container'>
				<input
					type={modifiedType(type)}
					placeholder={placeholder}
					className={`input-cont__input ${isAuth ? "input-cont__input--auth" : ""}`}
				/>
				{type == "password" ? (
					<p
						className='input-cont__show'
						onClick={() => setShowPassword(!showPassword)}
					>
						Show
					</p>
				) : null}
			</div>
		</div>
	)
}

export default Input
