import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import SellIcon from "@mui/icons-material/Sell"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"

export default function TransitionsModal({ open, onClose }) {
	const navigate = useNavigate()
	const styleDiv = "flex flex-col items-center bg-custom-gray rounded-lg border-4 border-main-yellow"
	const styleButton = { fontSize: 100, color: "white" }
	function handleOnClick(path) {
		onClose()
		navigate(path)
	}
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={onClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg flex gap-6">
						<div className={styleDiv}>
							<Button className="hover:bg-gray-100" onClick={() => handleOnClick("/addproduct")}>
								<SellIcon sx={styleButton} />
							</Button>
							<p className="mt-2 text-white">Sell</p>
						</div>
						<div className={styleDiv}>
							<Button className="hover:bg-gray-100" onClick={() => handleOnClick("/lookingtobuy")}>
								<SearchIcon sx={styleButton} color="primary" />
							</Button>
							<p className="mt-2 text-white">Looking to buy</p>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
