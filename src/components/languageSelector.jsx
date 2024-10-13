import { useTranslation } from "react-i18next"
import clsx from "clsx"

export default function LanguageSelector() {
	const { i18n } = useTranslation()

	function changeLanguage(code) {
		i18n.changeLanguage(code)
	}

	return (
		<div className="flex my-1">
			<button
				type="button"
				onClick={() => changeLanguage("th")}
				className={clsx("px-2", i18n.language === "th" ? "font-bold underline" : "font-normal")}
			>
				TH
			</button>
			<p className="px-1">|</p>
			<button
				type="button"
				onClick={() => changeLanguage("en")}
				className={clsx("px-2", i18n.language === "en" ? "font-bold underline" : "font-normal")}
			>
				EN
			</button>
		</div>
	)
}
