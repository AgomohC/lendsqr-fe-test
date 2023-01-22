export const getLocalItem = (key: string) => {
	const item = localStorage.getItem(key)
	if (item == null) {
		return null
	}
	return JSON.parse(item)
}
