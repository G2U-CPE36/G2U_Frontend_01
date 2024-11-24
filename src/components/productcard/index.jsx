import React from "react"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"

export default function ProductCard({ product, layoutType = "default" }) {
	const handleImageError = (e) => {
		e.target.src = "/pic/default.jpg" // Fallback image
	}
	const navigate = useNavigate()
	return (
		<Box
			sx={{
				backgroundColor: "#ffffff",
				padding: 2,
				borderRadius: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				boxShadow: "2px 6px 8px rgba(0, 0, 0, 0.3)",
				height: "100%",
				width: "100%",
			}}
		>
			{/* Layout Type: Default */}
			{layoutType === "mainPage" && (
				<>
					{/* Image */}
					<Box
						onClick={() => navigate(`/productDetail/${product.productId}`)}
						sx={{
							width: "350px",
							height: "320px",
							backgroundColor: "#c0c0c0",
							borderRadius: "8px",
							overflow: "hidden",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<img
							src={product.image}
							alt={product.name}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
							onError={handleImageError}
						/>
					</Box>

					{/* Product Info */}
					<Box
						sx={{
							width: "100%",
							textAlign: "left",
							marginTop: "8px",
							flexGrow: 1,
						}}
					>
						<h2 style={{ fontWeight: "bold", fontSize: "1rem" }}>{product.productName}</h2>
						<p style={{ color: "#757575", fontSize: "0.9rem" }}>{product.province}</p>
						<p style={{ color: "#d32f2f", fontWeight: "bold", fontSize: "1rem" }}>{product.condition}</p>
						<Box sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>฿ {product.price}</Box>
					</Box>
				</>
			)}

			{layoutType === "mypost" && (
				<Box
					key={product.id}
					onClick={() => navigate(`/productDetail/${product.productID}`)}
					sx={{
						height: "100%",
						borderRadius: "8px",
						display: "flex",
						flexDirection: "column",
						alignItems: "left",
						cursor: "pointer",
					}}
				>
					<img
						src={product.image || "/fallback-image.jpg"}
						alt={product.name}
						style={{
							width: "100%",
							height: "220px",
							objectFit: "cover",
							borderRadius: "8px",
						}}
					/>
					<h2 style={{ fontWeight: "bold", fontSize: "1rem" }}>{product.name}</h2>
					<p style={{ color: "#757575", fontSize: "0.9rem" }}>{product.province}</p>
					<Box sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>฿ {product.price}</Box>
				</Box>
			)}

		</Box>
	)
}
