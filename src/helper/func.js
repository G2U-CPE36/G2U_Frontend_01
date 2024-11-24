export function formatNumber(number, decimalPoints = 2) {
	const formattedNumber = number.toFixed(decimalPoints)
	return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
