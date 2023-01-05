import Input from "../components/Input"
import { useNavigate, Link } from "react-router-dom"
import "../styles/login.scss"

/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as Logo } from "../assets/icons/logo.svg"
import banner from "../assets/banner.svg"

const Login = () => {
	const navigate = useNavigate()

	return (
		<div className='login'>
			<div className='login__container'>
				<div className='login__images'>
					<div className='login__logo'>
						<Logo />
					</div>
					<img
						src={banner}
						alt='Banner'
					/>
				</div>
				<div className='login__form'>
					<div className='login__form-header'>
						<h1>Welcome!</h1>
						<h2>Enter details to login.</h2>
					</div>
					<div className='login__input-fields'>
						<Input
							type='text'
							isAuth
							placeholder='Email'
						/>
						<Input
							type='text'
							isAuth
							placeholder='Email'
						/>

						<Link to={"#"}>forgot password</Link>
					</div>
					<button
						className='login__button'
						onClick={() => navigate("/dashboard")}
					>
						log in
					</button>
				</div>
			</div>
		</div>
	)
}

export default Login
