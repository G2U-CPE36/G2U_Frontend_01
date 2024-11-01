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
				// const response = await fetch("/api/liked-products")
				// if (!response.ok) throw new Error("Failed to fetch liked products")
				// const data = await response.json()
				const data = [
					{
						id: 1,
						name: "Sample Product 1",
						description:
							"SThe beanbag chair offers a unique blend of comfort and versatility, making it an ideal addition to any living space. Crafted from high-quality, durable fabric, it provides a soft yet supportive seating option that conforms to the body for optimal relaxation. Its lightweight design allows for easy mobility, enabling users to reposition it effortlessly in various settings, whether for lounging, gaming, or casual gatherings. Available in a range of colors and sizes, this beanbag chair seamlessly complements any decor while ensuring a cozy and inviting atmosphere.",
						image: "/images/sample1.jpg",
						price: 20.0,
					},
					{
						id: 2,
						name: "Sample Product 2",
						description: "Sample description...",
						image: "/images/sample1.jpg",
						price: 20.0,
					},
					{
						id: 3,
						name: "Sample Product 3",
						description: "Sample description...",
						image: "/images/sample1.jpg",
						price: 20.0,
					},
				]

				setLikedProducts(data)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching liked products:", error)
				setError("Failed to load pages. Please try again later.")
			}
		}

		fetchLikedProducts()
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
							key={product.id}
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
							onClick={() => navigate(`/product/${product.id}`)}
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
							<Box sx={{ flex: 1, overflow: "hidden", textAlign: "left", alignSelf: "start" , mt: 1, ml: 3}}>
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
									navigate(`/buy/${product.id}`)
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
