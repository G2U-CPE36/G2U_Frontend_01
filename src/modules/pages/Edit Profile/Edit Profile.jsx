import { useState } from "react"
import {
	Box,
	Tab,
	Typography,
	TextField,
	Button,
	Card,
	CardContent,
	IconButton,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Edit, Delete } from "@mui/icons-material"

export default function ProfileWithLabTabs() {
	const [value, setValue] = useState("1")
	const [dob, setDob] = useState(null)
	const [addresses, setAddresses] = useState([
		{
			id: 1,
			name: "Mrs. Gdfgsf Fdleafjf",
			phone: "(+66) 12 345 6789",
			address: "123 Evergreen Street, Maplewood, CA 90210, USA",
			isDefault: true,
		},
		{
			id: 2,
			name: "Mr. John Doe",
			phone: "(+66) 98 765 4321",
			address: "456 Elm Street, Springfield, IL 62704, USA",
			isDefault: false,
		},
	])
	const [newAddress, setNewAddress] = useState({
		name: "",
		phone: "",
		address: "",
	})
	const [open, setOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [selectedAddressId, setSelectedAddressId] = useState(null)

	const handleChange = (_, newValue) => setValue(newValue)

	const handleSetDefaultAddress = (addressId) => {
		setAddresses((prevAddresses) =>
			prevAddresses.map(
				(address) =>
					address.id === addressId
						? { ...address, isDefault: true } // ตั้งที่อยู่นี้เป็น default
						: { ...address, isDefault: false }, // ตั้งที่อยู่อื่นๆ เป็นไม่ใช่ default
			),
		)
	}

	const handleDelete = (id) => {
		setAddresses((prev) => prev.filter((item) => item.id !== id))
	}

	const handleOpen = (editing = false, id = null) => {
		setIsEditing(editing)
		setSelectedAddressId(id)
		if (editing && id !== null) {
			const addressToEdit = addresses.find((address) => address.id === id)
			setNewAddress({
				name: addressToEdit.name,
				phone: addressToEdit.phone,
				address: addressToEdit.address,
			})
		}
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setIsEditing(false)
		setNewAddress({
			name: "",
			phone: "",
			address: "",
		})
	}

	const handleSaveAddress = () => {
		if (isEditing && selectedAddressId !== null) {
			// Update existing address
			setAddresses((prev) =>
				prev.map((item) => (item.id === selectedAddressId ? { ...item, ...newAddress } : item)),
			)
		} else {
			// Add new address
			setAddresses((prev) => [
				...prev,
				{
					id: Date.now(),
					...newAddress,
					isDefault: false,
				},
			])
		}
		handleClose()
	}
	const sortedAddresses = addresses.sort((a, b) => b.isDefault - a.isDefault)

	const handleSetDefaultCard = (cardId) => {
		setCards((prevCards) =>
			prevCards.map(
				(card) =>
					card.id === cardId
						? { ...card, isDefault: true } // ตั้งบัตรนี้เป็น default
						: { ...card, isDefault: false }, // ตั้งบัตรอื่นๆ เป็นไม่ใช่ default
			),
		)
	}
	const handleCardModalOpen = (editing = false, data = null) => {
		setIsEditingCard(editing)
		setCardData(data || { cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" })
		setCardFormOpen(true)
	}

	// Close modal
	const handleCardModalClose = () => {
		setCardFormOpen(false)
		setCardData({ cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" })
	}

	// Save card data
	const handleCardSave = () => {
		if (isEditingCard) {
			// Update existing card
			setCards((prevCards) =>
				prevCards.map((card) => (card.id === cardData.id ? { ...card, ...cardData } : card)),
			)
		} else {
			// Add new card
			setCards((prevCards) => [
				...prevCards,
				{ ...cardData, id: Date.now() }, // Generate a unique ID for the new card
			])
		}
		handleCardModalClose()
	}

	const [cardFormOpen, setCardFormOpen] = useState(false) // ประกาศ state
	const [isEditingCard, setIsEditingCard] = useState(false)
	const [cardData, setCardData] = useState({
		cardholderName: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
	})
	const [cards, setCards] = useState([])
	const handleDeleteCard = (id) => {
		setCards((prev) => prev.filter((card) => card.id !== id))
	}
	const sortedCards = [...cards].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))

	return (
		<Box sx={{ width: "100%", typography: "body1", height: "100vh" }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
					<TabList onChange={handleChange} aria-label="Profile Tabs" centered sx={{ width: "100%" }}>
						<Tab label="Profile" value="1" />
						<Tab label="Banks & Cards" value="2" />
						<Tab label="Addresses" value="3" />
						<Tab label="Change Password" value="4" />
						<Tab label="Privacy Settings" value="5" />
					</TabList>
				</Box>

				{/* Profile Tab */}
				<TabPanel value="1">
					<Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
						<Box sx={{ flex: "0 1 300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
							<Box
								sx={{
									width: "100px",
									height: "100px",
									borderRadius: "50%",
									backgroundColor: "#ccc",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									mb: 2,
								}}
							>
								<Typography>Photo</Typography>
							</Box>
							<Button variant="outlined">Change Photo</Button>
						</Box>
						<Box sx={{ flex: 1, pl: 3 }}>
							<form>
								<TextField label="Username" fullWidth margin="normal" />
								<TextField label="Name" fullWidth margin="normal" />
								<TextField label="Email" fullWidth margin="normal" />
								<TextField label="Phone Number" fullWidth margin="normal" />
								<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
									<FormLabel sx={{ mr: 2 }}>Gender</FormLabel>
									<RadioGroup row>
										<FormControlLabel value="male" control={<Radio />} label="Male" />
										<FormControlLabel value="female" control={<Radio />} label="Female" />
										<FormControlLabel value="other" control={<Radio />} label="Other" />
									</RadioGroup>
								</Box>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Date of Birth"
										value={dob}
										onChange={(newValue) => setDob(newValue)}
										renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
									/>
								</LocalizationProvider>
								<Box sx={{ mt: 3, textAlign: "right" }}>
									<Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
										Cancel
									</Button>
									<Button variant="contained" color="primary">
										Save
									</Button>
								</Box>
							</form>
						</Box>
					</Box>
				</TabPanel>

				{/* Banks & Cards Tab */}
				<TabPanel value="2">
					<Box sx={{ padding: "20px" }}>
						{/* Credit/Debit Card Section */}
						<Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: 2,
								}}
							>
								<Typography variant="h6">Credit / Debit Cards</Typography>
								<Button variant="contained" onClick={() => handleCardModalOpen(false)}>
									+ Add New Card
								</Button>
							</Box>

							{/* Display Saved Cards */}
							{sortedCards.length > 0 ? (
								sortedCards.map((card) => (
									<Box
										key={card.id} // Use card.id as the unique key
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											p: 2,
											border: "1px solid #ddd",
											borderRadius: "8px",
											mb: 2,
										}}
									>
										<Box sx={{ mr: 2 }}>
											<img
												src="/pic/image.png"
												alt="Card Icon"
												style={{ width: "50px", height: "50px", borderRadius: "8px" }}
											/>
										</Box>

										<Typography sx={{ flexGrow: 1 }}>**** **** **** {card.cardNumber.slice(-4)}</Typography>
										{/* Set Default Button */}
										<Button
											variant={card.isDefault ? "outlined" : "contained"}
											color={card.isDefault ? "secondary" : "primary"}
											onClick={() => handleSetDefaultCard(card.id)}
											sx={{ mr: 2 }}
										>
											{card.isDefault ? "Default" : "Set as Default"}
										</Button>
										<Box>
											<IconButton onClick={() => handleCardModalOpen(true, card)}>
												<Edit />
											</IconButton>
											<IconButton onClick={() => handleDeleteCard(card.id)} color="error">
												<Delete />
											</IconButton>
										</Box>
									</Box>
								))
							) : (
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										p: 2,
										border: "1px solid #ddd", // Add border similar to the cards
										borderRadius: "8px", // Same border radius as the cards
										height: "100px", // Adjust height as needed
										textAlign: "center",
										mb: 2, // Add margin at the bottom for spacing
									}}
								>
									<Typography>You don't have cards yet.</Typography>
								</Box>
							)}
						</Box>

						{/* Add/Edit Card Modal */}
						<Dialog open={cardFormOpen} onClose={handleCardModalClose} fullWidth maxWidth="sm">
							<DialogTitle>{isEditingCard ? "Edit Card" : "Add New Card"}</DialogTitle>
							<DialogContent>
								<TextField
									label="Cardholder Name"
									fullWidth
									margin="normal"
									value={cardData.cardholderName}
									onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
								/>
								<TextField
									label="Card Number"
									fullWidth
									margin="normal"
									value={cardData.cardNumber}
									onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
								/>
								<TextField
									label="Expiry Date (MM/YY)"
									fullWidth
									margin="normal"
									value={cardData.expiryDate}
									onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
								/>
								<TextField
									label="CVV"
									fullWidth
									margin="normal"
									value={cardData.cvv}
									onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCardModalClose} color="secondary">
									Cancel
								</Button>
								<Button onClick={handleCardSave} color="primary">
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</TabPanel>

				{/* Addresses Tab */}
				<TabPanel value="3">
					<Box sx={{ p: 3 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 3,
							}}
						>
							<Typography variant="h5" gutterBottom>
								My Addresses
							</Typography>
							<Button variant="contained" color="primary" onClick={() => handleOpen(false)}>
								+ Add New Address
							</Button>
						</Box>

						{/* Address Cards */}
						{sortedAddresses.map((item) => (
							<Card
								key={item.id}
								variant="outlined"
								sx={{
									mb: 2,
									border: item.isDefault ? "2px solid #FFD700" : "1px solid #ddd",
								}}
							>
								<CardContent>
									<Typography variant="h6">{item.name}</Typography>
									<Typography>{item.phone}</Typography>
									<Typography>{item.address}</Typography>
									<Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
										<div>
											{!item.isDefault && (
												<Button
													variant="outlined"
													color="primary"
													onClick={() => handleSetDefaultAddress(item.id)}
													sx={{ mr: 2 }}
												>
													Set as Default
												</Button>
											)}
											{item.isDefault && (
												<Button variant="contained" color="success" disabled>
													Default
												</Button>
											)}
										</div>
										<Box>
											<IconButton onClick={() => handleOpen(true, item.id)}>
												<Edit />
											</IconButton>
											<IconButton onClick={() => handleDelete(item.id)} color="error">
												<Delete />
											</IconButton>
										</Box>
									</Box>
								</CardContent>
							</Card>
						))}

						{/* Modal Component */}
						<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
							<DialogTitle>{isEditing ? "Edit Address" : "New Address"}</DialogTitle>
							<DialogContent>
								<TextField
									label="Full Name"
									value={newAddress.name}
									onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label="Phone"
									value={newAddress.phone}
									onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label="Address"
									value={newAddress.address}
									onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
									fullWidth
									margin="normal"
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="secondary">
									Cancel
								</Button>
								<Button onClick={handleSaveAddress} color="primary">
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</TabPanel>

				{/* Change Password Tab */}
				<TabPanel value="4">
					<Box sx={{ p: 3 }}>
						<form>
							<TextField label="Current Password" fullWidth margin="normal" type="password" />
							<TextField label="New Password" fullWidth margin="normal" type="password" />
							<TextField label="Confirm New Password" fullWidth margin="normal" type="password" />
							<Box sx={{ mt: 3, textAlign: "right" }}>
								<Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
									Cancel
								</Button>
								<Button variant="contained" color="primary">
									Save
								</Button>
							</Box>
						</form>
					</Box>
				</TabPanel>

				{/* Privacy Settings Tab */}
				<TabPanel value="5">
					<Box sx={{ p: 3 }}>
						<Typography variant="h4" gutterBottom>
							Privacy Settings
						</Typography>
						<Box>
							<Button variant="contained" color="primary">
								Save Changes
							</Button>
						</Box>
					</Box>
				</TabPanel>
			</TabContext>
		</Box>
	)
}
