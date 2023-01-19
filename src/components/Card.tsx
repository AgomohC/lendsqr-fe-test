import "../styles/card.scss"

type CardProps = {
	icon: JSX.Element
	text: string
	quantity: string
	idx: number
}
const Card = ({ icon, text, quantity, idx }: CardProps) => {
	return (
		<div className='card'>
			<div className={`card__icon card__icon--${idx}`}>{icon}</div>
			<h5 className='card__info'>{text}</h5>
			<h6 className='card__quantity'>{quantity}</h6>
		</div>
	)
}

export default Card
