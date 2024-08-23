export const numberToCurrency = (num: number) => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num)
}

export const numberToDate = (num: number) => {
	return new Date(num).toLocaleString()
}

export const randomId = () => {
	return Math.random().toString(36).substring(2, 10)
}
/**
 *
 * @param path is a base path is taken to compare
 * @param pathname is a current path in url address
 * @returns if current path is a children path of base path
 *
 * Example: `isActive('/products', '/products/102')` will return true beacause `/products/102` is a children of `/products` path
 */
export const isActiveLink = (path: string, pathname: string) => {
	if (path === '/') return path === pathname

	return pathname.startsWith(path)
}

isActiveLink('', '')
