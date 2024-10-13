import { Button } from "@mui/material"
import LanguageSelector from "../languageSelector"
import Translate from "../Translate"

export default function NavigationBar() {
	return (
		<nav className="bg-main-yellow p-4">
			<div className="container mx-auto px-4 sm:px-6 lg:px-20">
				<div className="flex items-center justify-between">
					<a href="/">
						<button type="button" className="text-4xl">
							G2U
						</button>
					</a>

					<div className="flex justify-between">
						<div className="mx-3">
							<LanguageSelector />
						</div>
						<Button
							variant="contained"
							href="/login"
							sx={{ backgroundColor: "#333652", width: "140px", height: "35px" }}
						>
							<Translate text="login/Register" className="text-white" />
						</Button>
					</div>
				</div>
			</div>
		</nav>
	)
}
