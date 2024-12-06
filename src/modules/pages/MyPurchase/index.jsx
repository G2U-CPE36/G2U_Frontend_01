import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material"
import Translate from "@/components/Translate"
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MyPurchasePages() {
	const [myPurchase, setMyPurchase] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleConfirmButton = async() => {

		// Reset data including formData
		try {
			const userId = localStorage.getItem("userId")
			const response = await fetch(`http://chawit.thddns.net:9790/api/users/${userId}`, {
				method: "DELETE",
			})
			if (!response.ok) throw new Error("Failed to delete account")

		} catch (error) {
			console.error("Error deleting account:", error.message)
		}
		
	}

	useEffect(() => {
		const fetchMyPurchase = async () => {
			try {
				// const response = await fetch("/api/liked-products")
				// if (!response.ok) throw new Error("Failed to fetch liked products")
				// const data = await response.json()
				const data = [
					{
						id: 1,
						name: "Sample Product 1",
						description: "test",
						image: "/images/sample1.jpg",
						status: "Deliverd",
					},
					{
						id: 2,
						name: "Sample Product 2",
						description: "test",
						image: "/images/sample2.jpg",
						status: "In_Progress",
					},
					{
						id: 3,
						name: "Sample Product 3",
						description: "test",
						image: "/images/sample3.jpg",
						status: "In_Progress",
					},
				]
				setMyPurchase(data)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching liked products:", error)
				setError("Failed to load pages. Please try again later.")
			}
		}

		// Try fetching data and retry if it fails
		const retryFetch = () => {
			let attempts = 0
			const maxAttempts = 10 // 10 attempts, 1 per second
			const intervalId = setInterval(() => {
				if (attempts < maxAttempts) {
					fetchMyPurchase()
					attempts += 1
				} else {
					clearInterval(intervalId)
					setLoading(false)
				}
			}, 1000) // Retry every 1 second
		}

		retryFetch()

		return () => clearInterval(retryFetch) // Cleanup on unmount
	}, [])

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress />
			</Box>
		)
	}

	if (error) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<Typography variant="h6" color="error">
					{error}
				</Typography>
			</Box>
		)
	}

	return (
		<Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					maxWidth: "1200px", // Set a max-width for the content
					width: "100%", // Make it responsive
				}}
			>
				<Box
					sx={{
						backgroundColor: "#f9f9f9",
						padding: "20px",
						borderRadius: "8px",
					}}
				>
					<Grid container alignItems="center" justifyContent="space-between">
						<Grid item xs={6} container alignItems="center">
							<ReceiptLongIcon sx={{ fontSize: "2rem", mr: 1 , mt:1}} />
							<Typography variant="h4" fontWeight="bold" color="#1b1b1b">
								<Translate text="mypurchase_Header" />
							</Typography>
						</Grid>
						<Grid item xs={6} container justifyContent="flex-end">
							<Box sx={{ display: "flex", alignItems: "right", gap: 36, mr: 12 }}>
								<Typography variant="h6" fontWeight="medium" color="#333">
									<Translate text="mypurchase_Status" />
								</Typography>
								<Typography variant="h6" fontWeight="medium" color="#333">
									<Translate text="mypurchase_Action" />
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
					{myPurchase.map((product) => (
						<Box
							key={product.id}
							sx={{
								display: "grid",
								gridTemplateColumns: "120px 0.73fr 100px 0.62fr 10px", // Adjust columns widths
								alignItems: "center",
								border: "1px solid #ddd",
								borderRadius: "8px",
								padding: "16px", // Adjust padding for better spacing
								backgroundColor: "#fff",
								gap: 2,
								height: "200px",
								width: "100%", // Ensure it takes up full width of the container
							}}
						>
							{/* Product Image */}
							<Box sx={{ width: "140px", height: "140px" }}>
								<img
									src={product.image}
									alt={product.name}
									style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
								/>
							</Box>

							{/* Product Details */}
							<Box sx={{ flex: 1, overflow: "hidden", textAlign: "left", alignSelf: "start", mt: 1, ml: 3 }}>
								<Typography variant="h6" fontWeight="medium">
									{product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5, mr: 10 }}
								>
									{product.description.length > 200
										? `${product.description.substring(0, 200)}...`
										: product.description}
								</Typography>
							</Box>

							{/* Product Status */}
							<Typography
								variant="h6"
								fontWeight="medium"
								color="#333"
								sx={{ textAlign: "center", alignSelf: "center" }}
							>
								{product.status === "Deliverd" ? (
									<Translate text="mypurchase_Delivered" />
								) : product.status === "In_Progress" ? (
									<Translate text="mypurchase_InProgress" />
								) : (
									<Translate text={product.status} />
								)}
							</Typography>

							{/* Action Buttons */}
							<Box
								sx={{
									display: "flex",
									gap: 2,
									justifyContent: "flex-end",
									alignSelf: "center",
								}}
							>
								{product.status === "Deliverd" ? (
									<>
										<Button
											variant="contained"
											color="primary"
											onClick={(e) => {
												e.stopPropagation()
												handleConfirmButton
												//navigate(`/buy/${product.id}`)
											}}
											sx={{ minWidth: "100px" }}
										>
											<Translate text="mypurchase_Confirm" />
										</Button>
										<Button
											variant="outlined"
											color="error"
											onClick={(e) => {
												e.stopPropagation()
												console.log(`Rejected product with id: ${product.id}`)
											}}
											sx={{ minWidth: "100px" }}
										>
											<Translate text="mypurchase_Reject" />
										</Button>
									</>
								) : (
									<Button
										variant="contained"
										color="inherit"
										disabled
										sx={{
											minWidth: "100px",
											backgroundColor: "#d3d3d3",
											color: "#888",
											cursor: "not-allowed",
										}}
									>
										<Translate text="mypurchase_Confirm" />
									</Button>
								)}
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	)
}
