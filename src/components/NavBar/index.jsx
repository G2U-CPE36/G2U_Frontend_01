import { Button } from "@mui/material"
import LanguageSelector from "../languageSelector"
import Translate from "../Translate"
import AccountMenu from "@/components/UserProfile"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import TransitionsModal from "../modal"

export default function NavigationBar() {
	const style = { backgroundColor: "#333652", width: "100px", height: "35px", borderRadius: "10px" }
	const userToken = useSelector((state) => state.auth.userToken)
	const [showModal, setShowModal] = useState(false)
	useEffect(() => {}, [userToken])

	function modal() {
		setShowModal(true)
	}

	function handleClose() {
		setShowModal(false)
	}

	return (
		<nav className="bg-main-yellow p-4">
			<div className="container mx-auto px-4 sm:px-6 lg:px-20">
				<div className="flex items-center justify-between">
					<a href="/">
						<button type="button" className="text-4xl">
							G2U
						</button>
					</a>

					<div className="flex justify-between items-center">
						{localStorage.getItem("token") && (
							<Button variant="contained" onClick={modal} sx={style}>
								<Translate text="post" className="text-white" />
							</Button>
						)}
						<TransitionsModal open={showModal} onClose={handleClose} />
						<div className="mx-3">
							<LanguageSelector />
						</div>
						{!localStorage.getItem("token") ? (
							<Button variant="contained" href="/login" sx={style}>
								<Translate text="signIn" className="text-white" />
							</Button>
						) : (
							<AccountMenu />
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}
