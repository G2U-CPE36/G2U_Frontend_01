import { Suspense } from "react"
import { createRoot } from "react-dom/client"
import App from "@/App.jsx"
import "@/locales/i18n.js"
import "@/index.css"
import { Provider } from "react-redux"
import { store, persistor } from "@/store"
import { PersistGate } from "redux-persist/integration/react"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme"
import CircularProgress from "@mui/material/CircularProgress"

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<Suspense fallback={<CircularProgress />}>
					<App />
				</Suspense>
			</ThemeProvider>
		</PersistGate>
	</Provider>,
)
