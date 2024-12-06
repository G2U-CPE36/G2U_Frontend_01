import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material"
import Translate from "@/components/Translate"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MyPurchasePages() {
	const [myPurchase, setMyPurchase] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchMyPurchase = async () => {
			try {
				const userId = parseInt(localStorage.getItem("userId"), 10)
				const response = await fetch(`http://chawit.thddns.net:9790/api/order/user/${userId}`)
				if (!response.ok) throw new Error("Failed to fetch purchases")
				const data = await response.json()
				console.log("Fetched Data:", data.orders) // Ensure this logs correctly

				const productsWithImages = data.orders.map((product) => {
					// Process product image if it exists
					if (product.Product.productImage[0] && product.Product.productImage[0].data) {
						const blob = new Blob([Uint8Array.from(product.Product.productImage[0].data)], {
							type: "image/png",
						})
						product.productImage = URL.createObjectURL(blob)
					}

					// Update orderStatus if not "SHIPPED"
					if (product.orderStatus !== "SHIPPED") {
						product.orderStatus = "IN_PROGRESS"
					}

					return product
				})

				setMyPurchase(productsWithImages) // Update state with fetched data
				setLoading(false) // Set loading to false only after success
			} catch (error) {
				console.error("Error fetching purchases:", error)
				setError("Failed to load pages. Please try again later.")
				setLoading(false) // Stop loading on error
			}
		}

		fetchMyPurchase() // Fetch only once when the component mounts
	}, [])

	// Log state updates to verify
	useEffect(() => {
		console.log("Updated myPurchase:", myPurchase)
	}, [myPurchase])

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
							<ReceiptLongIcon sx={{ fontSize: "2rem", mr: 1, mt: 1 }} />
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
							key={product.orderId} // Adjusted to match your API response
							sx={{
								display: "grid",
								gridTemplateColumns: "120px 0.73fr 100px 0.62fr 10px", // Adjust column widths
								alignItems: "center",
								border: "1px solid #ddd",
								borderRadius: "8px",
								padding: "16px",
								backgroundColor: "#fff",
								gap: 2,
								height: "200px",
								width: "100%",
							}}
						>
							{/* Product Image */}
							<Box sx={{ width: "140px", height: "140px" }}>
								<img
									src={product.productImage || "default-image-url"}
									alt={product.Product?.productName || "Product"}
									onError={(e) => {
										e.target.src = "default-image-url" // Fallback image if the URL fails
									}}
									style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
								/>
							</Box>

							{/* Product Details */}
							<Box
								sx={{
									flex: 1,
									overflow: "hidden",
									textAlign: "left",
									alignSelf: "start",
									mt: 1,
									ml: 3,
								}}
							>
								<Typography variant="h6" fontWeight="medium">
									{product.Product?.productName?.length > 30
										? `${product.Product.productName.substring(0, 30)}...`
										: product.Product?.productName}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5, mr: 10 }}
								>
									{product.Product?.productDescription?.length > 80
										? `${product.Product.productDescription.substring(0, 80)}...`
										: product.Product?.productDescription}
								</Typography>
							</Box>

							{/* Product Status */}
							<Typography
								variant="h6"
								fontWeight="medium"
								color="#333"
								sx={{ textAlign: "center", alignSelf: "center" }}
							>
								{product.orderStatus === "SHIPPED" ? (
									<Translate text="mypurchase_Delivered" />
								) : product.orderStatus === "IN_PROGRESS" ? (
									<Translate text="mypurchase_InProgress" />
								) : (
									<Translate text={product.orderStatus} />
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
								{product.orderStatus === "SHIPPED" ? (
									<>
										<Button
											variant="contained"
											color="primary"
											onClick={(e) => {
												e.stopPropagation()
												navigate(`/buy/${product.Product?.productId}`) // Adjusted for nested data
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
												console.log(`Rejected product with id: ${product.Product?.productId}`) // Adjusted for nested data
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
