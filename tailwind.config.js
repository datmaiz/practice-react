/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'primary-700': ['Roboto-700'],
				'primary-400': ['Roboto-400'],
				'primary-300': ['Roboto-300'],
				'secondary-700': ['Montserrat-700'],
				'secondary-600': ['Montserrat-600'],
				'secondary-400': ['Montserrat-400'],
			},
			backgroundImage: {
				'primary-gradient': 'linear-gradient(71deg, #FEAF00 19.35%, #F8D442 90.12%);',
			},
			colors: {
				primary: '#F2C94C',
				secondary: '#FEAF00',
				'black-600': '#323334',
				'black-700': '#222222',
				'black/40': '#00000066',
				'white/50': '#ffffff80',
				'white/90': '#FFFFFFE5',
				'gray-100': '#FAFAFA',
				'gray-400': '#EAE9E7',
				'gray-500': '#C4C4C4',
				'gray-600': '#ACACAC',
				'gray-800': '#6C6C6C',
			},
		},
	},
	plugins: [],
}
