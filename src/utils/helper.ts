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
export const isActiveLink = (path: string, pathname: string, basePath: string = '/') => {
	if (path === basePath) return path === pathname

	return pathname.startsWith(path)
}

export const toURLSearchParams = (obj: Record<string, unknown>) => {
	const params = new URLSearchParams()

	Object.keys(obj).forEach(key => {
		const value = obj[key]
		if (Array.isArray(value)) {
			value.forEach(val => params.append(key, val))
		} else {
			value && params.append(key, String(value))
		}
	})

	return params.toString()
}
