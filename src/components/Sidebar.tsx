import { routes } from "../utils/route-details"
import type { RouteGroups } from "../utils/route-details"
import organization from "../assets/icons/organization.svg"
import home from "../assets/icons/home.svg"
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg"
import "../styles/routes.scss"
import { Link, useLocation } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/icons/logo.svg"

const Links = ({ links, location }: { links: RouteGroups; location: string }) => {
	const { name, routes: groups } = links

	return (
		<div className='aside__block'>
			<h2 className='aside__block-title'>{name}</h2>
			<div className='aside__links'>
				{groups.map(route => {
					const { name, link, icon } = route
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
			{routes.map((route, idx) => {
				return (
					<Links
						links={route}
						key={route.name}
						location={pathname}
					/>
				)
			})}
		</aside>
	)
}

export default Sidebar
