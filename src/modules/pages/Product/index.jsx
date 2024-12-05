import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import { Button, IconButton, Dialog } from "@mui/material"
import { formatNumber } from "@/helper/func"
import axios from "axios"

export default function ProductDetail() {
	const { productID } = useParams()
	const [product, setProduct] = useState(null)
	const [error, setError] = useState("")
	const [image, setImage] = useState(null)
	const [open, setOpen] = useState(false) // State for the modal
	const navigate = useNavigate()

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				let userLikeList = JSON.parse(localStorage.getItem("userLikeList")) || []
				if (!Array.isArray(userLikeList)) {
					console.warn("userLikeList is not an array. Resetting to an empty array.")
					userLikeList = []
				}
				const response = await fetch(`http://chawit.thddns.net:9790/api/products/${productID}`)
				if (!response.ok) throw new Error("Failed to fetch product")
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
				productData.isLiked = userLikeList.includes(productData.productId)
				setProduct(productData)
			} catch (error) {
				console.error(error.message)
				setError("Failed to load product")
			}
		}
		fetchProduct()
	}, [productID])

	if (!product) {
		return <p>Loading product details...</p>
	}

	const imageArray = Object.values(product.images || {})

	const markAsFavorite = async (productId) => {
		try {
			const userId = parseInt(localStorage.getItem("userId"), 10)
			productId = parseInt(productID, 10)
			const response = await axios.post("http://chawit.thddns.net:9790/api/users/like", {
				productId,
				userId,
			})
			setProduct((prevProduct) => ({
				...prevProduct,
				isLiked: !prevProduct.isLiked,
			}))
		} catch (error) {
			console.error("Error marking product as favorite:", error)
		}
	}

	return (
		<div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
			{/* Left Section: Images */}
			<div className="lg:w-2/5 flex flex-col items-center">
				{/* Main Image */}
				<div className="w-full h-96 flex items-center justify-center border rounded-lg overflow-hidden">
					<img
						alt={product.productName}
						className="object-contain h-full cursor-pointer"
						src={image}
						onClick={() => setOpen(true)} // Open modal on click
					/>
				</div>

				{/* Thumbnail Images */}
				<div className="flex mt-4 gap-2">
					{product.images.map((img, index) => (
						<button
							key={index}
							type="button"
							onClick={() => setImage(img)}
							className={`border rounded-lg overflow-hidden p-1 ${
								image === img ? "border-blue-500" : "border-gray-300"
							}`}
						>
							<img alt={`Thumbnail ${index}`} className="w-20 h-20 object-contain" src={img} />
						</button>
					))}
				</div>
			</div>

			{/* Modal for Zoom */}
			<Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
				<div className="p-4 flex items-center justify-center">
					<img alt="Zoomed" src={image} className="w-full h-auto max-h-[80vh] object-contain" />
				</div>
			</Dialog>

			{/* Right Section: Product Details */}
			<div className="lg:w-3/5 flex flex-col">
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-3xl text-gray-800">{product.productName}</h1>
					<IconButton
						onClick={async (e) => {
							e.stopPropagation()
							await markAsFavorite(productID)
						}}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{product.isLiked ? (
							<FavoriteIcon sx={{ color: "#FF6347", fontSize: "2.5rem" }} />
						) : (
							<FavoriteBorderIcon sx={{ color: "#333", fontSize: "2.5rem" }} />
						)}
					</IconButton>
				</div>

				<div className="mt-3">
					<p className="text-4xl font-semibold text-green-600">฿ {formatNumber(product.price)}</p>
				</div>
				<div className="flex gap-5 mt-4 text-gray-500 text-sm">
					<p>
						By <span className="underline underline-offset-2">{product.username}</span>
					</p>
					<p>Post Date: {new Date(product.createdAt).toLocaleDateString()}</p>
				</div>
				<div className="mt-4">
					<h2 className="font-semibold text-lg">Condition:</h2>
					<p className="text-gray-700">{product.condition}</p>
				</div>
				<div className="mt-6">
					<h2 className="font-semibold text-lg">Product Description:</h2>
					<p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
						{product.productDescription}
					</p>
				</div>
				<Button
					sx={{
						mt: 5,
					}}
					variant="contained"
					startIcon={<ShoppingCartCheckoutIcon />}
					style={{
						backgroundColor: "#4CAF50",
						color: "white",
						padding: "10px 20px",
						borderRadius: "5px",
					}}
					onClick={() => navigate(`/checkout/${product.productId}`)}
				>
					Buy Product
				</Button>
			</div>
		</div>
	)
}
