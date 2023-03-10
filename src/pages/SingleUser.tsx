import "../styles/user.scss"
import { useEffect } from "react"
import { useSingleUserContext } from "../context/SingleUserContext/SingleUserContext"
import { useParams } from "react-router-dom"
import { ReactComponent as BackButton } from "../assets/icons/back.svg"
import { ReactComponent as Star } from "../assets/icons/star.svg"
import { useDashboardContext } from "../context/DashboardContext/DashboardContext"
import { useNavigate } from "react-router-dom"
import SkeletonLoader from "../components/SkeletonLoader"

const SingleUser = () => {
	const { id } = useParams()
	const { getSingleUser, clearUser, current_user, pending } = useSingleUserContext()
	const navigate = useNavigate()
	const { changeUserStatus } = useDashboardContext()
	const {
		profile,
		userName,
		accountNumber,
		accountBalance,
		orgName,
		email,
		education,
		socials,
		guarantor,
	} = current_user

	useEffect(() => {
		getSingleUser(id)
		return () => {
			clearUser()
		}
	}, [])

	return (
		<div className='user-layout'>
			<div
				className='user-layout__breadcrumb'
				onClick={() => navigate(-1)}
			>
				<BackButton /> Back to Users
			</div>

			<div className='user-layout__heading'>
				<h4>User Details</h4>
				<div className='user-layout__btns'>
					<button onClick={() => changeUserStatus("blacklist")}>Blacklist User</button>
					<button onClick={() => changeUserStatus("active")}>Activate User</button>
				</div>
			</div>

			<div className='user-layout__card'>
				<div className='user-layout__profile'>
					<div className='user-layout__profile--info'>
						{pending ? (
							<SkeletonLoader
								style={{ width: 50, height: 50 }}
								shape='circle'
							/>
						) : (
							<img
								src={profile?.avatar}
								alt={userName}
							/>
						)}
						<div className='user-layout__profile-text'>
							{pending ? (
								<>
									<SkeletonLoader
										style={{ width: 140, height: 14 }}
										shape='rectangle'
									/>
									<SkeletonLoader
										style={{ width: 140, height: 14 }}
										shape='rectangle'
									/>
								</>
							) : (
								<>
									<p>{profile?.firstName + " " + profile?.lastName}</p>
									<p>{accountNumber}</p>
								</>
							)}
						</div>
					</div>
					<div className='user-layout__profile--status'>
						<p>User's Tier</p>
						<div>
							<Star />
							<Star />
							<Star />
						</div>
					</div>
					<div className='user-layout__profile--bank'>
						{pending ? (
							<>
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							</>
						) : (
							<p>#{accountBalance}</p>
						)}
						{pending ? (
							<>
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							</>
						) : (
							<p className='user-layout__profile-info'>
								{accountNumber} / {orgName?.split("-").join(" ")}
							</p>
						)}
					</div>
				</div>
				<div className='user-layout__tabs-cont'>
					<div className='user-layout__tabs'>
						<p className='user-layout__tabs-links--active'>General Details</p>
						<p className='user-layout__tabs-links'>Documents</p>
						<p className='user-layout__tabs-links'>Bank Details</p>
						<p className='user-layout__tabs-links'>Loans</p>
						<p className='user-layout__tabs-links'>Savings</p>
						<p className='user-layout__tabs-links'>App and System</p>
					</div>
				</div>
			</div>
			<div className='user-layout__card'>
				<div className='user-layout__info'>
					<h5>Personal Information</h5>
					<div className='user-layout__details'>
						<div>
							<h6>full name</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{profile?.firstName + " " + profile?.lastName}</p>
							)}
						</div>
						<div>
							<h6>phone number</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{profile?.phoneNumber}</p>
							)}
						</div>
						<div>
							<h6>email address</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{email}</p>
							)}
						</div>
						<div>
							<h6>bvn</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{profile?.bvn}</p>
							)}
						</div>
						<div>
							<h6>gender</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{profile?.gender}</p>
							)}
						</div>
						<div>
							<h6>marital status</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{"Single"}</p>
							)}
						</div>
						<div>
							<h6>children</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{"none"}</p>
							)}
						</div>
						<div>
							<h6>type of apartment</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{profile?.address}</p>
							)}
						</div>
					</div>
				</div>

				<div className='user-layout__info'>
					<h5>Education and Employment</h5>
					<div className='user-layout__details'>
						<div>
							<h6>level of education</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{education?.level}</p>
							)}
						</div>
						<div>
							<h6>employment status</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{education?.employmentStatus}</p>
							)}
						</div>
						<div>
							<h6>sector of employment</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{education?.sector}</p>
							)}
						</div>
						<div>
							<h6>duration of employment</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{education?.duration}</p>
							)}
						</div>
						<div>
							<h6>office email</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{education?.officeEmail}</p>
							)}
						</div>
						<div>
							<h6>monthly income</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>
									{education?.monthlyIncome[0]} - {education?.monthlyIncome[1]}
								</p>
							)}
						</div>
						<div>
							<h6>loan repayment</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{education?.loanRepayment}</p>
							)}
						</div>
					</div>
				</div>

				<div className='user-layout__info'>
					<h5>Socials</h5>
					<div className='user-layout__details'>
						<div>
							<h6>twitter</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{socials?.twitter}</p>
							)}
						</div>

						<div>
							<h6>facebook</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{socials?.facebook}</p>
							)}
						</div>

						<div>
							<h6>instagram</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{socials?.instagram}</p>
							)}
						</div>
					</div>
				</div>

				<div className='user-layout__info'>
					<h5>guarantor</h5>
					<div className='user-layout__details'>
						<div>
							<h6>full name</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{guarantor?.firstName + " " + guarantor?.lastName}</p>
							)}
						</div>

						<div>
							<h6>phone number</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{guarantor?.phoneNumber}</p>
							)}
						</div>

						<div>
							<h6>address</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{guarantor?.address}</p>
							)}
						</div>

						<div>
							<h6>gender</h6>
							{pending ? (
								<SkeletonLoader
									style={{ width: 140, height: 14 }}
									shape='rectangle'
								/>
							) : (
								<p>{guarantor?.gender}</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleUser
