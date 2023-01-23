import { routes } from "../utils/route-details"
import type { RouteGroups } from "../utils/route-details"
import organization from "../assets/icons/organization.svg"
import home from "../assets/icons/home.svg"
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg"
import "../styles/routes.scss"
import { Link, useLocation } from "react-router-dom"
import logout from "../assets/icons/sign-out.svg"

const Links = ({
	links,
	location,
	showSysMessage,
}: {
	links: RouteGroups
	location: string
	showSysMessage: boolean
}) => {
	const { name, routes: groups } = links

	return (
		<div className='aside__block'>
			<h2 className='aside__block-title'>{name}</h2>
			<div className='aside__links'>
				{groups.map(route => {
					const { name, link, icon } = route
					if (!showSysMessage && name == "System Messages") {
						return null
					}
					return (
						<Link
							to={link}
							key={name}
							className={`aside__link${link === location ? "--active" : ""}`}
							title={name}
						>
							<img
								src={icon}
								alt=''
							/>
							<h3>{name}</h3>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

const Sidebar = () => {
	const { pathname } = useLocation()
	const isUser = pathname.match(/user/gi)

	return (
		<aside className='aside'>
			<div
				className='aside__heading--active'
				title='Switch Organization'
			>
				<img
					src={organization}
					alt=''
				/>
				<h1>Switch Organization</h1>
				<Arrow opacity='0.6' />
			</div>
			<div
				className='aside__heading'
				title='Dashboard'
			>
				<img
					src={home}
					alt=''
				/>
				<h1>Dashboard</h1>
			</div>
			{routes.map(route => {
				return (
					<Links
						links={route}
						key={route.name}
						location={pathname}
						showSysMessage={!!isUser}
					/>
				)
			})}
			<div className='logout'>
				{isUser ? (
					<div>
						<Link
							to={"#"}
							className={`aside__link`}
						>
							<img
								src={logout}
								alt=''
							/>
							<h3>Logout</h3>
						</Link>
					</div>
				) : null}
				<p>v1.2.0</p>
			</div>
		</aside>
	)
}

export default Sidebar
