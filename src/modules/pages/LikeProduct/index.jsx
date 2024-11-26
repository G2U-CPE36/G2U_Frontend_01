import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material"
import Translate from "@/components/Translate"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LikeProductPages() {
	const [likedProducts, setLikedProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchLikedProducts = async () => {
			try {
				const userId = localStorage.getItem("userId");
				const response = await fetch(`http://chawit.thddns.net:9790/api/users/getLike/${userId}`);
				if (!response.ok) throw new Error("Failed to fetch liked products");
				const result = await response.json();
				console.log(result);
	
				// Adjust for API response structure
				if (result && result.likedProducts && Array.isArray(result.likedProducts)) {
					setLikedProducts(result.likedProducts);
				} else {
					throw new Error("Invalid data format");
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching liked products:", error);
				setError("Failed to load pages. Please try again later.");
			}
		};
	
		// Try fetching data and retry if it fails
		const retryFetch = () => {
			let attempts = 0;
			const maxAttempts = 10; // 10 attempts, 1 per second
			const intervalId = setInterval(() => {
				if (attempts < maxAttempts) {
					fetchLikedProducts();
					attempts += 1;
				} else {
					clearInterval(intervalId);
					setLoading(false);
				}
			}, 1000); // Retry every 1 second
		};
	
		retryFetch();
	
		return () => clearInterval(retryFetch); // Cleanup on unmount
	}, []);
	

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
							<FavoriteIcon sx={{ color: "#FF1F1F", fontSize: "2rem", mr: 1 }} />
							<Typography variant="h4" fontWeight="bold" color="#1b1b1b">
								<Translate text="likepage_Header" />
							</Typography>
						</Grid>
						<Grid item xs={6} container justifyContent="flex-end">
							<Box sx={{ display: "flex", alignItems: "right", gap: 36, mr: 12 }}>
								<Typography variant="h6" fontWeight="medium" color="#333">
									<Translate text="likepage_Price" />
								</Typography>
								<Typography variant="h6" fontWeight="medium" color="#333">
									<Translate text="likepage_Action" />
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
					{likedProducts.map((product) => (
						<Box
							key={product.productId}
							sx={{
								display: "grid",
								gridTemplateColumns: "120px 1fr auto auto",
								alignItems: "center",
								border: "1px solid #ddd",
								borderRadius: "8px",
								padding: "24px",
								backgroundColor: "#fff",
								gap: 2,
								cursor: "pointer",
								height: "200px",
								width: "100%", // Ensure it takes up full width of the container
							}}
							onClick={() => navigate(`/product/${product.productId}`)}
						>
							{/* Product Image */}
							<Box sx={{ width: "140px", height: "140px" }}>
								<img
									src={product.image}
									alt={product.productName}
									style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
								/>
							</Box>

							{/* Product Details */}
							<Box sx={{ flex: 1, overflow: "hidden", textAlign: "left", alignSelf: "start", mt: 1, ml: 3 }}>
								<Typography variant="h6" fontWeight="medium">
									{product.productName.length > 30 ? `${product.productName.substring(0, 30)}...` : product.productName}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5, mr: 10 }}
								>
									{product.productDescription.length > 200
										? `${product.productDescription.substring(0, 200)}...`
										: product.productDescription}
								</Typography>
							</Box>

							{/* Product Price */}
							<Typography
								variant="h6"
								fontWeight="medium"
								color="#FF5722"
								sx={{ minWidth: "80px", textAlign: "right", alignSelf: "center", marginRight: 32 }}
							>
								฿{product.price}
							</Typography>

							{/* Action Button */}
							<Button
								variant="contained"
								color="primary"
								onClick={(e) => {
									e.stopPropagation() // Prevent click from bubbling up
									navigate(`/buy/${product.productId}`)
								}}
								sx={{ minWidth: "100px", justifySelf: "end", alignSelf: "center", marginRight: 8 }}
							>
								<Translate text="likepage_Buynow" />
							</Button>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	)
}
