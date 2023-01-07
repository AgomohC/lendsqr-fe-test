import InputWithSearch from "./InputWithSearch"
import "../styles/header.scss"
import { ReactComponent as Notification } from "../assets/icons/notification.svg"
import { ReactComponent as Logo } from "../assets/icons/logo.svg"
import { ReactComponent as Arrow } from "../assets/icons/filled-arrow.svg"
import avatar from "../assets/avatar.png"

const Header = () => {
	return (
		<header className='header'>
			<div className='header__logo-cont'>
				<Logo className='header__logo' />
			</div>

			<nav className='nav'>
				<div className='nav__search'>
					<InputWithSearch placeholder='Search for anything' />
				</div>
				<div className='nav__details'>
					<p className='nav__details-text'>Docs</p>
					<div className='nav__notif'>
						<Notification />
					</div>
					<div className='nav__avatar'>
						<img
							src={avatar}
							alt=''
						/>
						<h6>Adedeji</h6>
						<Arrow />
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
