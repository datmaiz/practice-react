/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'primary-700': ['Roboto-700'],
				'primary-400': ['Roboto-400'],
				'primary-300': ['Roboto-300'],
			},
		},
	},
	plugins: [],
}
