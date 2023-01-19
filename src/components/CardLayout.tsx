import Card from "./Card"
import "../styles/card.scss"
import { ReactComponent as ActiveUsers } from "../assets/icons/ellipse-active-users.svg"
import { ReactComponent as UserSavings } from "../assets/icons/ellipse-user-settings.svg"
import { ReactComponent as Users } from "../assets/icons/ellipse-users.svg"
import { ReactComponent as UserLoans } from "../assets/icons/ellipse-users-loans.svg"

const cardInfo = [
	{
		icon: <Users />,
		text: "Users",
		quantity: "2,453",
	},
	{
		icon: <ActiveUsers />,
		text: "Active Users",
		quantity: "2,453",
	},
	{
		icon: <UserLoans />,
		text: "Users with loans",
		quantity: "12,453",
	},
	{
		icon: <UserSavings />,
		text: "Users",
		quantity: "102,453",
	},
]
const CardLayout = () => {
	return (
		<div className='card-layout'>
			{cardInfo.map((info, idx) => {
				return (
					<Card
						{...info}
						key={info.text}
						idx={idx}
					/>
				)
			})}
		</div>
	)
}

export default CardLayout
