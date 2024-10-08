import { useTranslation } from "react-i18next"

export default function Translate({ text }) {
	const { t } = useTranslation()
	return t(text)
}
