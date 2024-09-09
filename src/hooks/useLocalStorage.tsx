export const useLocalStorage = (key: string) => {
	const set = (value: unknown) => {
		try {
			window && window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.log(error)
		}
	}

	const get = <T extends object>() => {
		try {
			const value = window.localStorage.getItem(key)
			return value ? (JSON.parse(value) as T) : undefined
		} catch (error) {
			console.log(error)
		}
	}

	const remove = () => {
		try {
			window && window.localStorage.removeItem(key)
		} catch (error) {
			console.log(error)
		}
	}

	return { get, set, remove }
}
