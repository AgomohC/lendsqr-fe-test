import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<>
			<Header />
			<Sidebar />
			<Outlet />
		</>
	)
}

export default Layout
