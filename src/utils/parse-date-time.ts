export const parseDateTime = (date: string): string => {
	return new Date(date).toLocaleTimeString("en-us", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})
}
