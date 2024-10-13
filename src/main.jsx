import { createRoot } from "react-dom/client"
import App from "@/App.jsx"
import "@/locales/i18n.js"
import "@/index.css"
import { Provider } from "react-redux"
import { store } from "@/store"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme"

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
)
