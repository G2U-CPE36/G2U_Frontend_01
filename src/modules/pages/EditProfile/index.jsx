import { useState } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import FormLabel from "@mui/material/FormLabel"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Checkbox } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Edit, Delete } from "@mui/icons-material"
import Translate from "@/components/Translate"

export default function ProfileWithLabTabs() {
	//Profile
	const [formData, setFormData] = useState({
		username: "",
		name: "",
		email: "",
		phone: "",
		gender: "",
		dob: null,
		photo: null, // เก็บไฟล์รูปภาพ
	})

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handlePhotoUpload = (event) => {
		const file = event.target.files[0]
		if (file) {
			setFormData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }))
		}
	}

	const handleSave = () => {
		setIsEditing(false) // Change to display mode
	}

	const handleEdit = () => {
		setIsEditing(true) // Switch to edit mode
	}

	const handleCancel = () => {
		setIsEditing(false) // Cancel edit
		// You may want to reset your data to the factory settings before editing.
	}

	//Address
	const [value, setValue] = useState("1")
	//const [dob, setDob] = useState(null)
	const [addresses, setAddresses] = useState([
		{
			province: "Bangkok",
			district: "Phaya Thai",
			subdistrict: "Ratchathewi",
			postcode: "10400",
			Address: "123 Sukhumvit Rd, 5th Floor",
			Phone: "0891234567",
			isDefault: true,
		},
	])
	const [newAddress, setNewAddress] = useState({
		province: "",
		district: "",
		subdistrict: "",
		postcode: "",
		Address: "",
		Phone: "",
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
						? { ...address, isDefault: true } // Set this address as default.
						: { ...address, isDefault: false }, // Set other addresses to non default.
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
				province: addressToEdit.province,
				district: addressToEdit.district,
				subdistrict: addressToEdit.subdistrict,
				postcode: addressToEdit.postcode,
				Address: addressToEdit.Address,
				Phone: addressToEdit.Phone,
			})
		}
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setIsEditing(false)
		setNewAddress({
			province: "",
			district: "",
			subdistrict: "",
			postcode: "",
			Address: "",
			Phone: "",
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

	//Cards
	const handleSetDefaultCard = (cardId) => {
		setCards((prevCards) =>
			prevCards.map(
				(card) =>
					card.id === cardId
						? { ...card, isDefault: true } // Set this card as default.
						: { ...card, isDefault: false }, // Set other cards to not default.
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

	const [cardFormOpen, setCardFormOpen] = useState(false)
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

	//Change password
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	})
	const [isEditingPassword, setIsEditingPassword] = useState(false) // Password edit status

	//const [isEditing, setIsEditing] = useState(false)

	const handleSavePassword = () => {
		// Validation
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			alert("New Password and Confirm Password must match.")
			return
		}
		if (passwordData.newPassword === passwordData.currentPassword) {
			alert("New Password cannot be the same as Current Password.")
			return
		}

		// If the inspection passes
		alert("Password updated successfully.")
		setPasswordData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		})
		setIsEditingPassword(false) // Change to display mode
	}

	const handlePasswordInputChange = (field, value) => {
		setPasswordData((prev) => ({ ...prev, [field]: value }))
	}

	const handleEditPassword = () => {
		setIsEditingPassword(true) // Switch to edit mode
	}

	const handleCancelPassword = () => {
		// Reset your password information to default.
		setPasswordData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		})
		setIsEditingPassword(false) // Change to display mode
	}

	// Privacy Settings Tab
	const [accept, setAccept] = useState(false) // State for sharing information with Affiliates

	const handleAcceptChange = (event) => {
		setAccept(event.target.checked)
	}

	/*const handleSavePrivacySettings = () => {
		alert(`Privacy Settings saved. Share information: ${accept ? "Yes" : "No"}`)
	}*/

	const handleDeleteAccount = () => {
		// ฟังก์ชันลบข้อมูลบัญชี
		alert("Your account will be deleted.")
		// Reset data including formData
		setFormData({
			username: "",
			name: "",
			email: "",
			phone: "",
			gender: "",
			dob: null,
			photo: null,
		})
	}

	return (
		<Box sx={{ width: "100%", typography: "body1", height: "100vh" }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
					<TabList onChange={handleChange} aria-label="Profile Tabs" centered sx={{ width: "100%" }}>
						<Tab label={<Translate text="Profile" />} value="1" />
						<Tab label={<Translate text="Cards" />} value="2" />
						<Tab label={<Translate text="Addresses" />} value="3" />
						<Tab label={<Translate text="Change Password" />} value="4" />
						<Tab label={<Translate text="Privacy Settings" />} value="5" />
					</TabList>
				</Box>

				{/* Profile Tab */}
				<TabPanel value="1">
					<Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
						{/* รูปโปรไฟล์ */}
						<Box
							sx={{
								flex: "0 1 300px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									width: "100px",
									height: "100px",
									borderRadius: "50%",
									backgroundColor: "#ccc",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									overflow: "hidden",
									mb: 2,
								}}
							>
								{formData.photo ? (
									<img
										src={formData.photo}
										alt="Profile"
										style={{ width: "100%", height: "100%", objectFit: "cover" }}
									/>
								) : (
									<Typography>
										<Translate text="Photo" />
									</Typography>
								)}
							</Box>
							{isEditing && (
								<Button variant="outlined" component="label">
									<Translate text="Change Photo" />
									<input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
								</Button>
							)}
						</Box>

						{/* ฟอร์มโปรไฟล์ */}
						<Box sx={{ flex: 1, pl: 3 }}>
							<form>
								<TextField
									label={<Translate text="Username" />}
									fullWidth
									margin="normal"
									value={formData.username}
									onChange={(e) => handleInputChange("username", e.target.value)}
									disabled={!isEditing}
								/>
								<TextField
									label={<Translate text="Name" />}
									fullWidth
									margin="normal"
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									disabled={!isEditing}
								/>
								<TextField
									label={<Translate text="Email" />}
									fullWidth
									margin="normal"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									disabled={!isEditing}
								/>
								<TextField
									label={<Translate text="Phone Number" />}
									fullWidth
									margin="normal"
									value={formData.phone}
									onChange={(e) => handleInputChange("phone", e.target.value)}
									disabled={!isEditing}
								/>

								<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
									<FormLabel sx={{ mr: 2 }}>{<Translate text="Gender" />}</FormLabel>
									<RadioGroup
										row
										value={formData.gender}
										onChange={(e) => handleInputChange("gender", e.target.value)}
									>
										<FormControlLabel
											value="male"
											control={<Radio />}
											label={<Translate text="Male" />}
											disabled={!isEditing}
										/>
										<FormControlLabel
											value="female"
											control={<Radio />}
											label={<Translate text="Female" />}
											disabled={!isEditing}
										/>
										<FormControlLabel value="other" control={<Radio />} label="Other" disabled={!isEditing} />
									</RadioGroup>
								</Box>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label={<Translate text="Date of Birth" />}
										value={formData.dob}
										onChange={(newValue) => handleInputChange("dob", newValue)}
										renderInput={(params) => (
											<TextField {...params} fullWidth margin="normal" disabled={!isEditing} />
										)}
									/>
								</LocalizationProvider>
								{/* ปุ่ม Save / Cancel หรือ Edit */}
								<Box sx={{ mt: 3, textAlign: "right" }}>
									{isEditing ? (
										<>
											<Button variant="outlined" color="secondary" sx={{ mr: 2 }} onClick={handleCancel}>
												<Translate text="Cancel" />
											</Button>
											<Button variant="contained" color="primary" onClick={handleSave}>
												<Translate text="Save" />
											</Button>
										</>
									) : (
										<IconButton onClick={handleEdit}>
											<Edit />
										</IconButton>
									)}
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
								<Typography variant="h6">
									<Translate text="Credit / Debit Cards" />
								</Typography>
								<Button variant="contained" onClick={() => handleCardModalOpen(false)}>
									<Translate text="+ Add New Card" />
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
												src="\card.png"
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
									<Typography>
										<Translate text="You don't have cards yet." />
									</Typography>
								</Box>
							)}
						</Box>

						{/* Add/Edit Card Modal */}
						<Dialog open={cardFormOpen} onClose={handleCardModalClose} fullWidth maxWidth="sm">
							<DialogTitle>
								<Translate text={isEditingCard ? "Edit Card" : "New Card"} />
							</DialogTitle>

							<DialogContent>
								<TextField
									label={<Translate text="Cardholder Name" />}
									fullWidth
									margin="normal"
									value={cardData.cardholderName}
									onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
								/>
								<TextField
									label={<Translate text="Card Number" />}
									fullWidth
									margin="normal"
									value={cardData.cardNumber}
									onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
								/>
								<TextField
									label={<Translate text="Expiry Date (MM/YY)" />}
									fullWidth
									margin="normal"
									value={cardData.expiryDate}
									onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
								/>
								<TextField
									label={<Translate text="CVV" />}
									fullWidth
									margin="normal"
									value={cardData.cvv}
									onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCardModalClose} color="secondary">
									<Typography>
										<Translate text="Cancel" />
									</Typography>
								</Button>
								<Button onClick={handleCardSave} color="primary">
									<Translate text="Save" />
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
								<Translate text="My Addresses" />
							</Typography>
							<Button variant="contained" color="primary" onClick={() => handleOpen(false)}>
								<Translate text="+ Add New Address" />
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
									<Typography>{item.province}</Typography>
									<Typography>{item.district}</Typography>
									<Typography>{item.subdistrict}</Typography>
									<Typography>{item.postcode}</Typography>
									<Typography>{item.address}</Typography>
									<Typography>{item.phone}</Typography>

									<Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
										<div>
											{!item.isDefault && (
												<Button
													variant="outlined"
													color="primary"
													onClick={() => handleSetDefaultAddress(item.id)}
													sx={{ mr: 2 }}
												>
													<Translate text="Set as Default" />
												</Button>
											)}
											{item.isDefault && (
												<Button variant="contained" color="success" disabled>
													<Translate text="Default" />
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
							<DialogTitle>
								{isEditing ? <Translate text="Edit Address" /> : <Translate text="New Address" />}
							</DialogTitle>
							<DialogContent>
								<TextField
									label={<Translate text="province" />}
									value={newAddress.nprovince}
									onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label={<Translate text="district" />}
									value={newAddress.district}
									onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label={<Translate text="subdistrict" />}
									value={newAddress.subdistrict}
									onChange={(e) => setNewAddress({ ...newAddress, subdistrict: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label={<Translate text="postcode" />}
									value={newAddress.postcode}
									onChange={(e) => setNewAddress({ ...newAddress, postcode: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label={<Translate text="Address" />}
									value={newAddress.address}
									onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
									fullWidth
									margin="normal"
								/>
								<TextField
									label={<Translate text="Phone" />}
									value={newAddress.phone}
									onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
									fullWidth
									margin="normal"
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="secondary">
									<Translate text="Cancel" />
								</Button>
								<Button onClick={handleSaveAddress} color="primary">
									<Translate text="Save" />
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</TabPanel>

				{/* Change Password Tab */}
				<TabPanel value="4">
					<Box sx={{ p: 3 }}>
						<form>
							<TextField
								label={<Translate text="Current Password" />}
								fullWidth
								margin="normal"
								type="password"
								disabled={!isEditingPassword}
								value={passwordData.currentPassword}
								onChange={(e) => handlePasswordInputChange("currentPassword", e.target.value)}
							/>
							<TextField
								label={<Translate text="New Password" />}
								fullWidth
								margin="normal"
								type="password"
								disabled={!isEditingPassword}
								value={passwordData.newPassword}
								onChange={(e) => handlePasswordInputChange("newPassword", e.target.value)}
							/>
							<TextField
								label={<Translate text="Confirm New Password" />}
								fullWidth
								margin="normal"
								type="password"
								disabled={!isEditingPassword}
								value={passwordData.confirmPassword}
								onChange={(e) => handlePasswordInputChange("confirmPassword", e.target.value)}
							/>
							<Box sx={{ mt: 3, textAlign: "right" }}>
								{isEditingPassword ? (
									<>
										<Button
											variant="outlined"
											color="secondary"
											sx={{ mr: 2 }}
											onClick={handleCancelPassword} // ล้างข้อมูลเมื่อกด Cancel
										>
											<Translate text="Cancel" />
										</Button>
										<Button variant="contained" color="primary" onClick={handleSavePassword}>
											<Translate text="Save" />
										</Button>
									</>
								) : (
									<IconButton onClick={handleEditPassword}>
										<Edit />
									</IconButton>
								)}
							</Box>
						</form>
					</Box>
				</TabPanel>

				{/* Privacy Settings Tab */}
				<TabPanel value="5">
					<Box sx={{ p: 3 }}>
						<Typography variant="h5" gutterBottom>
							{<Translate text="Privacy Settings" />}
						</Typography>

						{/* Share Information to Affiliates */}
						<Box sx={{ mb: 2 }}>
							<Typography variant="body1" gutterBottom>
								{<Translate text="Share your information with our Affiliates" />}
							</Typography>
							<FormControlLabel
								control={<Checkbox checked={accept} onChange={handleAcceptChange} />}
								label={<Translate text="Accept" />}
							/>
						</Box>

						{/* Request Account Deletion */}
						<Box sx={{ mt: 4 }}>
							<Typography variant="h6">
								<Translate text="Request Account Deletion" />
							</Typography>
							<Button variant="contained" color="error" onClick={handleDeleteAccount}>
								{<Translate text="Delete Account" />}
							</Button>
						</Box>
					</Box>
				</TabPanel>
			</TabContext>
		</Box>
	)
}
