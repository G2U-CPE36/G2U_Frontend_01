import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import SellIcon from "@mui/icons-material/Sell"
import SearchIcon from "@mui/icons-material/Search"

export default function TransitionsModal({ open, onClose }) {
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
					<div className="flex absolute top-1/2 left-1/2">
						<div className="flex flex-col">
							<Button>
								<SellIcon sx={{ fontSize: 40 }} />
							</Button>
							<p>Testadwad</p>
						</div>
						<div className="flex flex-col">
							<Button>
								<SearchIcon sx={{ fontSize: 40 }} />
							</Button>
							<p>Testadwad</p>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
