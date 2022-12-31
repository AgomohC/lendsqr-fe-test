import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { DashboardProvider } from "./context/DashboardContext/DashboardContext"
import { SingleUserProvider } from "./context/SIngleUserContext/SingleUserContext"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<DashboardProvider>
				<SingleUserProvider>
					<App />
				</SingleUserProvider>
			</DashboardProvider>
		</Router>
	</React.StrictMode>
)
