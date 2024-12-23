import { useState, useEffect } from "react"
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
import { useNavigate } from "react-router-dom"
import { logout } from "@/modules/Login/authSlice"
import { useDispatch } from "react-redux"

export default function ProfileWithLabTabs() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
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

	//address
	const [value, setValue] = useState("1")
	const [errors, setErrors] = useState({
		province: "",
		district: "",
		subdistrict: "",
		postcode: "",
		address: "",
		phone: "",
	})
	const [newAddress, setNewAddress] = useState({
		province: "",
		district: "",
		subdistrict: "",
		postcode: "",
		address: "",
		phone: "",
	})
	const ValidateAddressForm = () => {
		const newErrors = {}
		if (!newAddress.province.trim()) newErrors.province = <Translate text="Province is required." />
		if (!newAddress.district.trim()) newErrors.district = <Translate text="District is required." />
		//if (!newAddress.subdistrict.trim()) newErrors.subdistrict = "Subdistrict is required.";
		if (!newAddress.postcode.trim()) newErrors.postcode = <Translate text="Postcode is required." />
		else if (!/^\d{5}$/.test(newAddress.postcode)) newErrors.postcode = "Postcode must be 5 digits."
		if (!newAddress.address.trim()) newErrors.address = <Translate text="address is required." />
		if (!newAddress.phone.trim()) newErrors.phone = <Translate text="phone is required." />
		else if (!/^\d{10}$/.test(newAddress.phone)) newErrors.phone = "phone Number must be 10 digits."

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const [addressdata, setAddresses] = useState([])

	const addresses = async () => {
		try {
			const userId = localStorage.getItem("userId")
			const response = await fetch(`http://chawit.thddns.net:9790/api/address/${userId}`)
			if (!response.ok) throw new Error("Failed to get address")
			const data = await response.json()
			console.log(data)
			setAddresses(data) // Update state with fetched data
		} catch (error) {
			console.error("Error loading address:", error.message)
			setErrors((prev) => ({
				...prev,
				address: "Failed to load address from the server.",
			}))
		}
	}

	useEffect(() => {
		addresses()
	}, [])

	const saveAddressToApi = async (newAddress) => {
		try {
			// Retrieve userId from localStorage
			const userId = localStorage.getItem("userId")

			if (!userId) {
				throw new Error("User ID is not available in localStorage")
			}

			// Add userId to the newAddress object
			const requestBody = { ...newAddress, userId }

			console.log(requestBody) // Log the final request body

			// Send the request
			const response = await fetch("http://chawit.thddns.net:9790/api/address/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody), // Include userId in the body
			})

			if (!response.ok) throw new Error("Failed to save address")

			addresses() // Refresh address list
		} catch (error) {
			console.error("Error saving address:", error.message)
		}
	}

	const updateAddressToApi = async (id, updatedAddress) => {
		try {
			console.log("test", id, updatedAddress)
			const response = await fetch(`http://chawit.thddns.net:9790/api/address/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedAddress),
			})
			if (!response.ok) throw new Error("Failed to update address")
			addresses() // Refresh address list
		} catch (error) {
			console.error("Error updating address:", error.message)
		}
	}

	const [open, setOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [selectedAddressId, setSelectedAddressId] = useState(null)

	const handleChange = (_, newValue) => setValue(newValue)

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`http://chawit.thddns.net:9790/api/address/${id}`, {
				method: "DELETE",
			})
			if (!response.ok) throw new Error("Failed to delete address")
			addresses() // Refresh address list
		} catch (error) {
			console.error("Error deleting address:", error.message)
		}
	}

	const handleOpen = (editing = false, id, addressid) => {
		if (!editing && addressdata.length > 0) {
			alert("You can only add one address. Please edit the existing address.")
			return
		}
		setIsEditing(editing)
		setSelectedAddressId(addressid)
		if (editing && id !== null) {
			const addressToEdit = addressdata.find((address) => address.id === id)
			setNewAddress({
				province: addressToEdit.province,
				district: addressToEdit.district,
				subdistrict: addressToEdit.subdistrict,
				postcode: addressToEdit.postcode,
				address: addressToEdit.address,
				phone: addressToEdit.phone,
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
			address: "",
			phone: "",
		})
	}

	const handleSaveAddress = () => {
		if (!ValidateAddressForm()) return

		if (isEditing == true) {
			updateAddressToApi(selectedAddressId, newAddress)
		} else {
			saveAddressToApi(newAddress)
		}
		handleClose()
	}

	const sortedAddresses = addressdata.sort((a, b) => b.isDefault - a.isDefault)

	//Cards

	const ValidateCardForm = () => {
		const newErrors = {}
		console.log(cards)
		// if (!cards.cardholderName.trim())
		// 	newErrors.cardholderName = <Translate text="Cardholder Name is required." />
		if (!cards.cardNumber.trim()) newErrors.cardNumber = <Translate text="Card Number is required." />
		if (!/^\d{16}$/.test(cards.cardNumber))
			newErrors.cardNumber = <Translate text="Card Number must be 16 digits." />
		if (!cards.expiryDate.trim()) newErrors.expiryDate = <Translate text="Expiry Date is required." />
		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cards.expiryDate))
			newErrors.expiryDate = <Translate text="Expiry Date must be in MM/YY format." />
		if (!cards.cvv.trim()) newErrors.cvv = <Translate text="CVV is required." />
		if (!/^\d{3}$/.test(cards.cvv)) newErrors.cvv = <Translate text="CVV must be 3 digits." />

		setErrors(newErrors) // อัปเดตสถานะข้อผิดพลาด
		return Object.keys(newErrors).length === 0 // คืนค่า true ถ้าข้อผิดพลาดเป็นค่าว่าง
	}

	const handleCardModalOpen = (editing = false, data) => {
		if (!editing && cards.length > 0) {
			alert("You can only add one card. Please edit the existing card.")
			return
		}
		setIsEditingCard(editing)
		setCardData(data || { cardNumber: "", expiryDate: "", cvv: "" })
		setCardFormOpen(true)
	}

	// Close modal
	const handleCardModalClose = () => {
		setCardFormOpen(false)
		//setCardData(card{ cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" })
	}

	const handleCardSave = async (cards) => {
		console.log("hellow", cards)
		if (!ValidateCardForm(cards)) return

		if (isEditingCard == true) {
			updateCardToApi(cards.id, cards)
		} else {
			saveCardToApi(cards)
		}
		handleCardModalClose()
	}
	// Save card data
	// const handleCardSave = () => {
	// 	if (!ValidateCardForm()) {
	// 		// หยุดการบันทึกหากฟอร์มไม่ผ่านการตรวจสอบ
	// 		return
	// 	}

	// 	if (isEditingCard) {
	// 		// แก้ไขบัตรที่มีอยู่
	// 		setCards((prevCards) =>
	// 			prevCards.map((cards) => (cards.id === cardData.id ? { ...cards, ...cardData } : cards)),
	// 		)
	// 	} else {
	// 		if (cards.length === 0) {
	// 			setCards([{ ...cardData, id: Date.now() }])
	// 		} else {
	// 			alert("You can only add one card.")
	// 		}
	// 	}

	// 	// ปิดฟอร์มและล้างข้อมูล
	// 	handleCardModalClose()
	// }

	const [cardFormOpen, setCardFormOpen] = useState(false)
	const [isEditingCard, setIsEditingCard] = useState(false)
	// const [cardData, setCardData] = useState({
	// 	cardholderName: "",
	// 	cardNumber: "",
	// 	expiryDate: "",
	// 	cvv: "",
	// })

	const cardData = async () => {
		try {
			const userId = localStorage.getItem("userId")
			const response = await fetch(`http://chawit.thddns.net:9790/api/cards/${userId}`)
			if (!response.ok) throw new Error("Failed to get address")
			const data = await response.json()
			console.log(data)
			setCardData(data) // Update state with fetched data
			console.log(data)
		} catch (error) {
			console.error("Error loading address:", error.message)
			setErrors((prev) => ({
				...prev,
				address: "Failed to load address from the server.",
			}))
		}
	}

	useEffect(() => {
		cardData()
	}, [])

	const [cards, setCardData] = useState([])
	const handleDeleteCard = async (id) => {
		try {
			const response = await fetch(`http://chawit.thddns.net:9790/api/cards/delete-card/${id}`, {
				method: "DELETE",
			})
			if (!response.ok) throw new Error("Failed to delete card")
			cardData() // Refresh address list
		} catch (error) {
			console.error("Error deleting card:", error.message)
		}
	}
	const sortedCards = cards

	const saveCardToApi = async () => {
		try {
			// Retrieve userId from localStorage
			const userId = parseInt(localStorage.getItem("userId"), 10)

			if (!userId) {
				throw new Error("User ID is not available in localStorage")
			}

			// Add userId to the newAddress object
			const requestBody = { ...cards, userId }

			console.log(requestBody) // Log the final request body

			// Send the request
			const response = await fetch("http://chawit.thddns.net:9790/api/cards/add-card", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody), // Include userId in the body
			})

			if (!response.ok) throw new Error("Failed to save card")

			cardData() // Refresh address list
		} catch (error) {
			console.error("Error saving card:", error.message)
		}
	}

	const updateCardToApi = async (id, updatedCard) => {
		try {
			console.log("test", id, updatedCard)
			const response = await fetch(`http://chawit.thddns.net:9790/api/address/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedCard),
			})
			if (!response.ok) throw new Error("Failed to update card")
			cardData() // Refresh address list
		} catch (error) {
			console.error("Error updating card:", error.message)
		}
	}

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

	const handleDeleteAccount = async () => {
		// ฟังก์ชันลบข้อมูลบัญชี
		alert("Your account has been deleted.")
		// Reset data including formData
		try {
			const userId = localStorage.getItem("userId")
			const response = await fetch(`http://chawit.thddns.net:9790/api/users/${userId}`, {
				method: "DELETE",
			})
			if (!response.ok) throw new Error("Failed to delete account")
			dispatch(logout()) // Refresh address list
			navigate("/")
		} catch (error) {
			console.error("Error deleting account:", error.message)
		}
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
									label={<Translate text="phone Number" />}
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
								{/* ปุ่มเพิ่มบัตร */}
								{cards.length === 0 && (
									<Button variant="contained" onClick={() => handleCardModalOpen(false)}>
										<Translate text="+ Add New Card" />
									</Button>
								)}
							</Box>

							{/* Display Saved Cards */}
							{sortedCards.length > 0 ? (
								sortedCards.map((cards) => (
									<Box
										key={cards.id} // Use card.id as the unique key
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

										<Typography sx={{ flexGrow: 1 }}>**** **** **** {cards.cardNumber.slice(-4)}</Typography>
										<Box>
											<IconButton onClick={() => handleCardModalOpen(true, cards)}>
												<Edit />
											</IconButton>
											<IconButton onClick={() => handleDeleteCard(cards.id)} color="error">
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
								{/* <TextField
									label={<Translate text="Cardholder Name" />}
									fullWidth
									margin="normal"
									value={cardData.cardholderName}
									onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
									error={!!errors.cardholderName}
									helperText={errors.cardholderName}
								/> */}
								<TextField
									label={<Translate text="Card Number" />}
									fullWidth
									margin="normal"
									value={cards.cardNumber}
									onChange={(e) => setCardData({ ...cards, cardNumber: e.target.value })}
									error={!!errors.cardNumber}
									helperText={errors.cardNumber}
								/>
								<TextField
									label={<Translate text="Expiry Date (MM/YY)" />}
									fullWidth
									margin="normal"
									value={cards.expiryDate}
									onChange={(e) => setCardData({ ...cards, expiryDate: e.target.value })}
									error={!!errors.expiryDate}
									helperText={errors.expiryDate}
								/>
								<TextField
									label={<Translate text="CVV" />}
									fullWidth
									margin="normal"
									value={cards.cvv}
									onChange={(e) => setCardData({ ...cards, cvv: e.target.value })}
									error={!!errors.cvv}
									helperText={errors.cvv}
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
							{/* ปุ่มเพิ่มที่อยู่ */}
							{addressdata.length === 0 && (
								<Button variant="contained" color="primary" onClick={() => handleOpen(false)}>
									<Translate text="+ Add New address" />
								</Button>
							)}
						</Box>

						{/* address Cards */}
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
										<Box>
											<IconButton onClick={() => handleOpen(true, item.id, item.addressId)}>
												<Edit />
											</IconButton>
											<IconButton onClick={() => handleDelete(item.addressId)} color="error">
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
								{isEditing ? <Translate text="Edit address" /> : <Translate text="New address" />}
							</DialogTitle>
							<DialogContent>
								<TextField
									label={<Translate text="Province" />}
									value={newAddress.province}
									onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
									fullWidth
									margin="normal"
									error={!!errors.province} // เส้นขอบสีแดงถ้ามีข้อผิดพลาด
									helperText={errors.province} // แสดงข้อความข้อผิดพลาด
								/>
								<TextField
									label={<Translate text="District" />}
									value={newAddress.district}
									onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
									fullWidth
									margin="normal"
									error={!!errors.district}
									helperText={errors.district}
								/>
								<TextField
									label={<Translate text="Subdistrict" />}
									value={newAddress.subdistrict}
									onChange={(e) => setNewAddress({ ...newAddress, subdistrict: e.target.value })}
									fullWidth
									margin="normal"
									//error={!!errors.subdistrict}
									//helperText={errors.subdistrict}
								/>
								<TextField
									label={<Translate text="Postcode" />}
									value={newAddress.postcode}
									onChange={(e) => setNewAddress({ ...newAddress, postcode: e.target.value })}
									fullWidth
									margin="normal"
									error={!!errors.postcode}
									helperText={errors.postcode}
									inputProps={{
										inputMode: "numeric", // ใช้ตัวเลือก inputMode สำหรับตัวเลข
										pattern: "[0-9]*", // รองรับเฉพาะตัวเลข
									}}
								/>
								<TextField
									label={<Translate text="address" />}
									value={newAddress.address}
									onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
									fullWidth
									margin="normal"
									error={!!errors.address}
									helperText={errors.address}
								/>
								<TextField
									label={<Translate text="phone" />}
									value={newAddress.phone}
									onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
									fullWidth
									margin="normal"
									error={!!errors.phone}
									helperText={errors.phone}
									inputProps={{
										inputMode: "numeric", // ใช้ตัวเลือก inputMode สำหรับตัวเลข
										pattern: "[0-9]*", // รองรับเฉพาะตัวเลข
									}}
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

						{/* Verify Button */}
						<Box sx={{ mt: 4 }}>
							<Typography variant="h6">
								<Translate text="Verify Your Account" />
							</Typography>
							<Button variant="contained" color="primary">
								{<Translate text="Verify Account" />}
							</Button>
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
