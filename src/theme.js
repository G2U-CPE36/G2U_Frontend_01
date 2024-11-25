import { createTheme } from "@mui/material"

export const theme = createTheme({
	palette: {
		primary: {
			main: "#f7ce46", //our main yellow color
		},
	},
	typography: {
		fontFamily: ["Itim", "cursive"].join(","),
	},
})
