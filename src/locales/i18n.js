import i18n from "i18next"
import Languagedetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"

i18n
	.use(Languagedetector)
	.use(initReactI18next)
	.use(Backend)
	.init({
		debug: false,
		fallbackLng: "en",
		returnObject: true,
		backend: {
			// Path to load translation files
			loadPath: "src/locales/{{lng}}/translation.json",
		},
	})
