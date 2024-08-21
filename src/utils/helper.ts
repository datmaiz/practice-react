export const numberToCurrency = (num: number) => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num)
}

export const numberToDate = (num: number) => {
	return new Date(num).toLocaleString()
}

export const randomId = () => {
	return Math.random().toString(36).substring(2, 10)
}
