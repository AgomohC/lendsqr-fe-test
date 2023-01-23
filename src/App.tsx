import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import SingleUser from "./pages/SingleUser"
import Layout from "./components/Layout"
import "./styles/index.scss"

const App = () => {
	return (
		<Routes>
			<Route
				path='/login'
				element={<Login />}
			/>
			<Route
				path='/'
				element={<Navigate to={"/login"} />}
			/>
			<Route
				element={<Layout />}
				path={"/dashboard"}
			>
				<Route
					index
					element={<Dashboard />}
				/>
				<Route
					element={<SingleUser />}
					path={"user/:id"}
				></Route>
			</Route>
		</Routes>
	)
}

export default App
