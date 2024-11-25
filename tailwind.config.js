/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				MF: ["Itim", "cursive"],
			},
			colors: {
				"main-yellow": "#f7ce46",
				"light-yellow": "#FDF9E6",
				"sign-up": "#0F3DDE",
			},
		},
	},
	plugins: [],
}
