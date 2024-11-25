import { useTranslation } from "react-i18next"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const languages = [
	{ code: "en", lang: "English" },
	{ code: "th", lang: "Thai" },
]

export default function LanguageSelector() {
	const { i18n } = useTranslation()

	function changeLanguage(code) {
		i18n.changeLanguage(code)
	}

	return (
		<Stack spacing={2} direction="row">
			{languages.map((lng) => (
				<Button variant="text" key={lng.code} onClick={() => changeLanguage(lng.code)}>
					{lng.lang}
				</Button>
			))}
		</Stack>
	)
}
