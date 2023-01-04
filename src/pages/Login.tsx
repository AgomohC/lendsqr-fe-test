import Input from "../components/Input"
import InputWithSearch from "../components/InputWithSearch"

const Login = () => {
	return (
		<>
			<Input
				placeholder='enter'
				type='select'
				label='username'
				// isAuth
			/>
			<InputWithSearch placeholder='enter' />
		</>
	)
}

export default Login
