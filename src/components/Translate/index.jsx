import { useTranslation } from "react-i18next"

export default function Translate(props) {
	const { t } = useTranslation()
	return <span className={props.className}>{t(props.text)}</span>
}
