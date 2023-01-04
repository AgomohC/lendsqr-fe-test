import "../styles/input.scss"
import { useState } from "react"

/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg"
import { ReactComponent as Calender } from "../assets/icons/calendar.svg"

type InputProps = {
	placeholder: string
	type: "text" | "password" | "email" | "date" | "select"
	label?: string
	className?: string
	isAuth?: true
}

const Input = ({ placeholder, type, label, isAuth }: InputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	const modifiedType = (type: string) => {
		if (type !== "password") {
			if (type == "date" || type == "select") {
				return "text"
			}
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

				{type == "select" ? <Arrow className='input-cont__icon' /> : null}
				{type == "date" ? <Calender className='input-cont__icon' /> : null}
			</div>
		</div>
	)
}

export default Input
