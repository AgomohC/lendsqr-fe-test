import user from "../assets/icons/user-friends.svg"
import guarantors from "../assets/icons/guarantors.svg"
import loans from "../assets/icons/loans.svg"
import decisions from "../assets/icons/handshake.svg"
import savings from "../assets/icons/piggy-bank.svg"
import loanRequest from "../assets/icons/loan-request.svg"
import whiteList from "../assets/icons/white-list.svg"
import karma from "../assets/icons/karma.svg"
import organization from "../assets/icons/organization.svg"
import loanProducts from "../assets/icons/loan-request.svg"
import savingsProducts from "../assets/icons/savings-product.svg"
import fees from "../assets/icons/fees.svg"
import transactions from "../assets/icons/transactions.svg"
import services from "../assets/icons/services.svg"
import serviceAccounts from "../assets/icons/user-cog.svg"
import settlements from "../assets/icons/settlements.svg"
import reports from "../assets/icons/reports.svg"
import preferences from "../assets/icons/preferences.svg"
import pricing from "../assets/icons/pricing.svg"
import logs from "../assets/icons/audit-logs.svg"

type Route = { icon: string; link: string; name: string }
export type RouteGroups = { name: string; routes: Route[] }

export const routes: RouteGroups[] = [
	{
		name: "customers",
		routes: [
			{
				icon: user,
				link: "/dashboard",
				name: "Users",
			},
			{
				icon: guarantors,
				link: "#",
				name: "Guarantors",
			},
			{
				icon: loans,
				link: "#",
				name: "Loans",
			},
			{
				icon: decisions,
				link: "#",
				name: "Decision Models",
			},
			{
				icon: savings,
				link: "#",
				name: "Savings",
			},
			{
				icon: loanRequest,
				link: "#",
				name: "Loan Request",
			},
			{
				icon: whiteList,
				link: "#",
				name: "Whitelist",
			},
			{
				icon: karma,
				link: "#",
				name: "Karma",
			},
		],
	},
	{
		name: "Business",
		routes: [
			{ icon: organization, link: "#", name: "Organization" },
			{ icon: loanProducts, link: "#", name: "Loan Products" },
			{ icon: savingsProducts, link: "#", name: "Savings Products" },
			{ icon: fees, link: "#", name: "Fees and charges" },
			{ icon: transactions, link: "#", name: "Transactions" },
			{ icon: services, link: "#", name: "Services" },
			{ icon: serviceAccounts, link: "#", name: "Service Account" },
			{ icon: settlements, link: "#", name: "Settlements" },
			{ icon: reports, link: "#", name: "Reports" },
		],
	},
	{
		name: "Settings",
		routes: [
			{ icon: preferences, link: "#", name: "Preferences" },
			{ icon: pricing, link: "#", name: "Fees and Pricing" },
			{ icon: logs, link: "#", name: "Audit Logs" },
		],
	},
]
