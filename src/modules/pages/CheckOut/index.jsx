import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import Translate from "@/components/Translate"
import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

const mockproduct = {
	id: 1,
	title: "Tefal เตารีดแรงดันไอน้ำ Express COMPACT SV7120",
	images: "/tee1.png",
	postBy: "Teeboy",
	price: 2634.5691,
	description: `
- รีดเรียบเร็ว ด้วยแรงดันไอน้ำ 6 บาร์
- พลังไอน้ำต่อเนื่อง 120 กรัม/นาที พลังไอน้ำเพิ่มพิเศษ 350 กรัม/นาที
- แผ่นหน้าเตารีด Xpress Glide
- ความจุแทงค์น้ำ 1.7 ลิตร สามารถรีดผ้าแนวตั้งได้
- Manual setting ปรับอุณหภูมิ และไอน้ำได้ตามต้องการ
- มีระบบ Eco mode ช่วยประหยัดพลังงาน
- ช้อนดักตะกรัน Calc collector ช่วยขจัดตะกรันได้อย่างง่ายดายหมดจด
- ส่งฟรี
- ประกัน 2 ปี
  `,
}

const mockdata = {
	address:
		"โคนัน เอโดงาวะ (+66) 99 999 9999 99/99, ซอย สุขสวัสดิ์99, ลัดหลวง, ตำบลบางพึ่ง, อำเภอพระประแดง, จังหวัดสมุทรปราการ, 10130",
	shippingfee: "0",
}

export default function VirtualReceipt() {
	const navigate = useNavigate()
	const [buttonLabel, setButtonLabel] = useState("Place Order")
	const [isDisabled, setIsDisabled] = useState(false)
	const [image, setImage] = useState(null)
	const { productID } = useParams()
	const [productfinal, setProduct] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(true)

	const handlePlaceOrder = async () => {
		try {
			setIsDisabled(true) // Disable the button to prevent multiple clicks
			setButtonLabel("Processing...")

			const userId = parseInt(localStorage.getItem("userId"))
			if (!userId || !productID || !productfinal) {
				setButtonLabel("Invalid Order Details")
				setIsDisabled(false)
				return
			}
			const productId = parseInt(productID)
			const sellerId = parseInt(productfinal.userId)
			const addressId = parseInt(productfinal.addressId)

			console.log(productId,userId,sellerId,addressId)
			// Send POST request
			const response = await axios.post("http://chawit.thddns.net:9790/api/order/orders", {
				productId,
				userId,
				sellerId,
				addressId,
			})

			console.log("Order Response:", response.data) // Debugging API response
			navigate("/mypurchase")
		} catch (error) {
			console.error("Error placing order:", error)
			setButtonLabel("Place Order") // Revert button state
			setIsDisabled(false)
		} finally {
			setIsDisabled(false) // Ensure button is re-enabled
		}
	}

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				console.log(productID)
				const response = await fetch(`http://chawit.thddns.net:9790/api/products/${productID}`)
				if (!response.ok) {
					throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
				}

				const productData = await response.json()
				console.log(productData)

				if (Array.isArray(productData.productImage)) {
					const imageUrls = productData.productImage.map((imgBuffer) => {
						const blob = new Blob([new Uint8Array(imgBuffer.data)], { type: "image/jpeg" })
						return URL.createObjectURL(blob)
					})
					setImage(imageUrls[0])
					productData.images = imageUrls
				} else {
					productData.images = []
				}
				const userId = localStorage.getItem("userId")
				const response2 = await fetch(`http://chawit.thddns.net:9790/api/address/${userId}`)
				if (!response2.ok) throw new Error("Failed to get address")
				const data2 = await response2.json()

				const response3 = await fetch(`http://chawit.thddns.net:9790/api/cards/${userId}`)
				if (!response3.ok) throw new Error("Failed to get address")
				const data3 = await response3.json()
				//console.log(data2[0].address); // Should print the address value
				const newproduct = {
					...productData,
					address: data2[0].address,
					cardNumber: data3[0].cardNumber,
					addressId: data2[0].addressId
				}

				console.log("new", newproduct)
				setProduct(newproduct)
				setLoading(false)
			} catch (error) {
				console.error(error.message)
				setError("Failed to load product")
			}
		}
		fetchProduct()
	}, [])

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Container
			sx={{
				mt: 2,
				p: 3,
				width: "600px",
				backgroundColor: "#fff",
				border: "1px dashed #aaa",
				boxShadow: "0 0 10px rgba(0,0,0,0.1)",
				borderRadius: "8px",
				fontFamily: "'Courier New', monospace",
			}}
		>
			{/* Receipt Header */}
			<Box sx={{ textAlign: "center", mb: 3 }}>
				<ReceiptLongOutlinedIcon sx={{ fontSize: 50, mb: 1, color: "#000000" }} />
				<Divider sx={{ my: 2, borderStyle: "dashed" }} />
			</Box>

			{/* Delivery Information */}
			<Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
				<LocationOnOutlinedIcon sx={{ mr: 1 }} />
				<Translate text="DeliveryInformation" />
			</Typography>
			<Typography
				variant="body1"
				color="textSecondary"
				sx={{
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					mb: 2,
				}}
			>
				{productfinal.address.substring(0, 70)}...
			</Typography>

			{/* Product Card */}
			<Card
				sx={{
					display: "flex",
					mt: 3,
					mb: 3,
					cursor: "pointer",
					boxShadow: "none",
					border: "1px solid #eee",
					borderRadius: "8px",
				}}
				onClick={() => navigate(`/product/${productID}`)}
			>
				<CardMedia
					component="img"
					sx={{
						width: 120,
						height: 120,
						objectFit: "fill",
						borderRadius: "8px 0 0 8px",
					}}
					image={productfinal.images[0]}
					alt={productfinal.images[0]}
				/>
				<CardContent sx={{ flex: 1 }}>
					<Typography variant="h6">{productfinal.productName}</Typography>
					<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
						{productfinal.productDescription.substring(0, 100)}...
					</Typography>
					{/* <Typography variant="h6" sx={{ mt: 1, textAlign: "right" }}>
						฿ {mockproduct.price.toFixed(2)}
					</Typography> */}
				</CardContent>
			</Card>

			{/* Shipping Options */}
			<Typography variant="h6">
				<Translate text="ShippingOptions" />
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
				<LocalShippingOutlinedIcon sx={{ mr: 1 }} />
				<Typography variant="body1">
					<Translate text="InternationalExpress" />
				</Typography>
			</Box>

			{/* Payment Methods */}
			<Typography variant="h6" sx={{ mt: 2 }}>
				<Translate text="PaymentMethods" />
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
				<CreditCardOutlinedIcon sx={{ mr: 1 }} />
				<Typography variant="body1">
					<Translate text="CreditCard" />: **** **** **** {productfinal.cardNumber.slice(-4)}
				</Typography>
			</Box>

			{/* Payment Details */}
			<Typography variant="h6" sx={{ mt: 2 }}>
				<Translate text="OrderTotal" />
			</Typography>
			<Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
				<Typography variant="body1">
					<Translate text="ShippingFee" />
				</Typography>
				<Typography variant="body1">฿ {mockdata.shippingfee}</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
				<Typography variant="body1">
					<Translate text="Total" />
				</Typography>
				<Typography variant="body1">฿ {productfinal.price.toFixed(2)}</Typography>
			</Box>

			{/* Footer */}
			<Box sx={{ mt: 3, textAlign: "center" }}>
				<Box sx={{ mt: 3, textAlign: "center" }}>
					<Button
						variant="contained"
						sx={{
							px: 5,
							py: 1.5,
							fontSize: "16px",
							backgroundColor: "#FFD700", // Yellow color
							color: "#000", // Black text
							"&:hover": {
								backgroundColor: "#FFC107", // Slightly darker yellow on hover
							},
							"&:disabled": {
								backgroundColor: "#FFE082", // Lighter yellow when disabled
								color: "#B0B0B0", // Gray text when disabled
							},
						}}
						onClick={handlePlaceOrder}
						disabled={isDisabled}
					>
						{buttonLabel}
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
