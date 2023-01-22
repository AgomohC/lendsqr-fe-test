import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { DashboardProvider } from "./context/DashboardContext/DashboardContext"
import { ModalProvider } from "./context/ModalContext/ModalContext"
import { SingleUserProvider } from "./context/SingleUserContext/SingleUserContext"
import { BrowserRouter as Router } from "react-router-dom"
import Modals from "./components/Modals/Modals"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<DashboardProvider>
				<SingleUserProvider>
					<ModalProvider>
						<Modals />
						<App />
					</ModalProvider>
				</SingleUserProvider>
			</DashboardProvider>
		</Router>
	</React.StrictMode>
)
