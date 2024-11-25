import { createRoot } from "react-dom/client"
import App from "@/App.jsx"
import "@/locales/i18n.js"
import "@/index.css"
import { Provider } from "react-redux"
import LanguageSelector from "@/components/languageSelector"
import { store } from "@/store"

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<LanguageSelector />
		<App />
	</Provider>,
)
