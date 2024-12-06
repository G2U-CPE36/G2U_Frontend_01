import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Translate from "@/components/Translate"
import { debounce } from "lodash"

export default function MainPage() {
	const [category, setCategory] = useState("")
	const [maxPrice, setMaxPrice] = useState("")
	const [province, setProvince] = useState("")
	const [typeOfPost, setTypeOfPost] = useState("sellPost")
	const [searchQuery, setSearchQuery] = useState("")
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleCategoryChange = (event) => setCategory(event.target.value)
	const handleMaxPriceChange = (event) => setMaxPrice(event.target.value)
	const handleProvinceChange = (event) => setProvince(event.target.value)
	const handleSearchChange = (event) => {
		const value = event.target.value.toLowerCase()
		setSearchQuery(value)
		debouncedFetchSearchResults(value)
	}

	// Debounced search API call
	const debouncedFetchSearchResults = debounce(async (query) => {
		if (query.trim() === "") {
			setFilteredProducts(products) // Reset to all products if search is cleared
			return
		}

		try {
			const response = await fetch(
				`http://chawit.thddns.net:9790/api/mainproduct/search?search=${query}&page=1&limit=10`,
			)
			if (!response.ok) throw new Error("Failed to fetch search results")

			const data = await response.json()
			console.log("Search Results:", data)

			// Process the API response to match your data structure
			const searchedProducts = data.map((product) => {
				// Process product image if it exists
				if (product.productImage && product.productImage[0]?.data) {
					const blob = new Blob([Uint8Array.from(product.productImage[0].data)], {
						type: "image/png",
					})
					product.productImage = URL.createObjectURL(blob)
				}
				return product
			})

			setFilteredProducts(searchedProducts)
		} catch (error) {
			console.error("Error during search:", error.message)
			setError("Failed to fetch search results. Please try again later.")
		}
	}, 300) // Debounce delay in milliseconds
	const handleTypeChange = (event) => setTypeOfPost(event.target.value)

	// Function to mark a product as favorite
	const markAsFavorite = async (productId) => {
		try {
			const userId = parseInt(localStorage.getItem("userId"), 10) // Replace with actual userId logic
			if (!userId) {
				alert("you need to login first")
				return false
			}
			const response = await axios.post("http://chawit.thddns.net:9790/api/users/like", {
				productId,
				userId,
			})
			console.log("Product marked as favorite:", response.data)
			return true
		} catch (error) {
			console.error("Error marking product as favorite:", error)
		}
	}

	const handleImageError = (e) => {
		e.target.src = "/pic/default.jpg"
	}


	
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Wait for liked products to be fetched
				const userId = localStorage.getItem("userId")
				if (userId) {
					await fetchLikedProducts()
				}

				// Then fetch all products
				const fetchAllProducts = async () => {
					try {
						// Fetch the liked list from local storage and parse it as JSON
						let userLikeList = JSON.parse(localStorage.getItem("userLikeList")) || []

						// Ensure userLikeList is an array
						if (!Array.isArray(userLikeList)) {
							console.warn("userLikeList is not an array. Resetting to an empty array.")
							userLikeList = []
						}
						let response
						if (typeOfPost === "sellPost") {
							response = await fetch("http://chawit.thddns.net:9790/api/mainproduct/products?page=1&limit=8")
							console.log("This is from sell post")
						} else {
							response = await fetch("http://chawit.thddns.net:9790/api/openorders/get/1-20")
							console.log("This is from buy post")
						}

						const data = await response.json()
						console.log(data)

						// Defensive check: Ensure data is an array
						if (!Array.isArray(data)) {
							throw new Error("Data format is incorrect, expected an array.")
						}

						const productsWithImages = data.map((product) => {
							// Add isLiked field based on userLikeList
							product.isLiked = userLikeList.includes(product.productId)

							// Process product image if it exists
							if (product.productImage[0] && product.productImage[0].data) {
								const blob = new Blob([Uint8Array.from(product.productImage[0].data)], {
									type: "image/png",
								})
								product.productImage = URL.createObjectURL(blob)
							}

							return product
						})

						setProducts(productsWithImages)
						setFilteredProducts(productsWithImages)
					} catch (error) {
						console.error("Error fetching products:", error.message)
						setError("Failed to load products from the server. Using mock data.")
					}
				}

				// Call fetchAllProducts after fetchLikedProducts completes
				await fetchAllProducts()
			} catch (error) {
				console.error("Error during data fetching:", error.message)
			}
		}

		fetchData()
	}, [typeOfPost])

	useEffect(() => {
		const filtered = products.filter((product) => {
			const matchesCategory = category
				? product.categoryId === parseInt(category) // Filter by categoryId
				: true
			const matchesMaxPrice = maxPrice
				? (() => {
						if (maxPrice.includes("-")) {
							const [min, max] = maxPrice.split("-").map(Number)
							return product.price >= min && product.price <= max
						} else if (maxPrice.includes("+")) {
							const min = parseInt(maxPrice)
							return product.price >= min
						}
						return true
					})()
				: true
			const matchesProvince = province ? product.province.toLowerCase() === province.toLowerCase() : true
			const matchesSearchQuery = searchQuery ? product.productName.toLowerCase().includes(searchQuery) : true
			return matchesCategory && matchesMaxPrice && matchesProvince && matchesSearchQuery
		})
		setFilteredProducts(filtered)
	}, [products, category, maxPrice, province, searchQuery])

	const fetchLikedProducts = async () => {
		try {
			const userId = localStorage.getItem("userId")
			const response = await fetch(`http://chawit.thddns.net:9790/api/users/getLike/${userId}`)
			const result = await response.json()

			if (!response.ok) {
				if (result.message === "No liked products found") {
					localStorage.removeItem("userLikeList")
				} else {
					console.log("error", result)
				}
				return true
			}

			// Save product IDs as a JSON array
			const productIds = result.likedProducts.map((product) => product.productId)
			localStorage.setItem("userLikeList", JSON.stringify(productIds)) // Save as JSON array

			return true // Indicate success
		} catch (error) {
			console.error("Error fetching liked products:", error.message)
			setError("Failed to load pages. Please try again later.")
			return false // Indicate failure
		}
	}

	return (
		<Box sx={{ width: "100%" }}>
			{/* Header Section */}
			<Box
				component="header"
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between", // Distribute items evenly
					alignItems: "center",
					mt: 1,
					padding: 2,
				}}
			>
				<Box sx={{ width: "100%" }}>
					<FormControl fullWidth>
						<InputLabel
							id="category-select-label"
							sx={{ color: "#FFFFFF" }} // Label text color
						>
							<Translate text="Categories" />
						</InputLabel>
						<Select
							labelId="category-select-label"
							id="category-select"
							value={category}
							label="Categories"
							onChange={handleCategoryChange}
							sx={{
								backgroundColor: "#333652", // Dropdown background color
								color: "#FFFFFF", // Dropdown text color
								height: "52px",
								borderRadius: "6px",
								"& .MuiSvgIcon-root": {
									color: "#FFFFFF", // Arrow dropdown color
								},
							}}
							// MenuProps={{
							// 	PaperProps: {
							// 		sx: {
							// 			bgcolor: "#FFFACD", // Menu background color
							// 			"& .MuiMenuItem-root": {
							// 				color: "#000000", // Menu item text color
							// 				"&:hover": {
							// 					backgroundColor: "#FFD700", // Menu item hover color
							// 				},
							// 			},
							// 		},
							// 	},
							// }}
						>
							<MenuItem value="">
								<Translate text="Any" />
							</MenuItem>
							<MenuItem value="1">
								<Translate text="Electronics" />
							</MenuItem>
							<MenuItem value="2">
								<Translate text="Books" />
							</MenuItem>
							<MenuItem value="3">
								<Translate text="Clothing" />
							</MenuItem>
							<MenuItem value="4">
								<Translate text="Home" />
							</MenuItem>
							<MenuItem value="5">
								<Translate text="Sports" />
							</MenuItem>
							<MenuItem value="6">
								<Translate text="Beauty" />
							</MenuItem>
							<MenuItem value="7">
								<Translate text="Toys" />
							</MenuItem>
							<MenuItem value="8">
								<Translate text="Groceries" />
							</MenuItem>
							<MenuItem value="9">
								<Translate text="Furniture" />
							</MenuItem>
							<MenuItem value="10">
								<Translate text="Automotive" />
							</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box sx={{ width: "100%" }}>
					<FormControl fullWidth>
						<InputLabel id="price-select-label" sx={{ color: "#FFFFFF" }}>
							<Translate text="Price Range" />
						</InputLabel>
						<Select
							labelId="price-select-label"
							id="price-select"
							value={maxPrice}
							onChange={handleMaxPriceChange}
							label="Price Range"
							sx={{
								backgroundColor: "#333652",
								height: "52px",
								color: "#FFFFFF",
								borderRadius: "6px",
								"& .MuiSvgIcon-root": {
									color: "#FFFFFF",
								},
							}}
						>
							<MenuItem value="">
								<Translate text="Any" />
							</MenuItem>
							<MenuItem value="0-50">$0-$50</MenuItem>
							<MenuItem value="50-100">$50-$100</MenuItem>
							<MenuItem value="100-200">$100-$200</MenuItem>
							<MenuItem value="200+">$200+</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box sx={{ width: "100%" }}>
					<FormControl fullWidth>
						<InputLabel id="province-select-label" sx={{ color: "#FFFFFF" }}>
							<Translate text="Province" />
						</InputLabel>
						<Select
							labelId="province-select-label"
							id="province-select"
							value={province}
							label="Province"
							onChange={handleProvinceChange}
							sx={{
								backgroundColor: "#333652", // Dropdown background color
								color: "#FFFFFF", // Dropdown text color
								height: "52px",
								borderRadius: "6px",
								"& .MuiSvgIcon-root": {
									color: "#FFFFFF", // Arrow dropdown color
								},
							}}
						>
							<MenuItem value="">
								<Translate text="Any" />
							</MenuItem>
							<MenuItem value="bangkok">Bangkok</MenuItem>
							<MenuItem value="chiang Mai">Chiang Mai</MenuItem>
							<MenuItem value="phuket">Phuket</MenuItem>
							<MenuItem value="khon kaen">Khon Kaen</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box sx={{ width: "100%", mr: 4 }}>
					<FormControl fullWidth>
						<InputLabel id="Type-select-label" sx={{ color: "#FFFFFF" }}>
							<Translate text="Type" />
						</InputLabel>
						<Select
							labelId="Type-select-label"
							id="Type-select"
							value={typeOfPost}
							label="Type"
							onChange={handleTypeChange}
							sx={{
								backgroundColor: "#333652", // Dropdown background color
								color: "#FFFFFF", // Dropdown text color
								height: "52px",
								borderRadius: "6px",
								"& .MuiSvgIcon-root": {
									color: "#FFFFFF", // Arrow dropdown color
								},
							}}
						>
							<MenuItem value="buyPost">Buying Product</MenuItem>
							<MenuItem value="sellPost">Selling Product</MenuItem>
						</Select>
					</FormControl>
				</Box>

				{/* <Box>
					<button
						type="button"
						className="bg-red-500 text-white px-4 py-2 rounded"
						onClick={clearFilters}
					>
						<Translate text="Clear Filters" />
					</button>
				</Box> */}

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						border: "1px solid #e0e0e0",
						borderRadius: "50px",
						padding: "6px 16px",
						flexGrow: 1,
						width: "125%",
						outline: "3px solid #FFD700",
					}}
				>
					<input
						type="text"
						placeholder="Search..."
						style={{
							flexGrow: 1,
							border: "none",
							outline: "none",
							padding: "0 8px",
						}}
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<SearchIcon sx={{ color: "#757575", marginLeft: "8px" }} />
				</Box>
			</Box>

			{/* Products Section */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
					gap: 2,
					marginTop: 2,
					padding: "0px 64px",
				}}
			>
				{filteredProducts.map((product) => (
					<Box
						key={product.productId}
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
							cursor: "pointer",
						}}
						onClick={() => navigate(`/product/${product.productId}`)}
					>
						{/* Product Image */}
						<Box
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
								src={product.productImage}
								alt={product.productName}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "fill",
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
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
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
							<Box
								sx={{
									position: "relative", // Enable relative positioning
									top: "-20px", // Move up by 10px
								}}
							>
								{product.isLiked ? (
									<FavoriteIcon
										onClick={async (e) => {
											e.stopPropagation()
											const updatedProducts = products.map((p) =>
												p.productId === product.productId ? { ...p, isLiked: !product.isLiked } : p,
											)

											const getFav = await markAsFavorite(product.productId)
											if (getFav) {
												setProducts(updatedProducts)
											}
										}} // Optionally disable un-liking
										sx={{ color: "#ff1744", fontSize: "2.5rem", cursor: "pointer" }} // Filled heart with red color
									/>
								) : (
									<FavoriteBorderIcon
										onClick={async (e) => {
											e.stopPropagation()
											const updatedProducts = products.map((p) =>
												p.productId === product.productId ? { ...p, isLiked: !product.isLiked } : p,
											)

											const getFav = await markAsFavorite(product.productId)
											if (getFav) {
												setProducts(updatedProducts)
											}
										}} // Optionally disable un-liking
										sx={{ color: "#333", fontSize: "2.5rem", cursor: "pointer" }} // Outlined heart
									/>
								)}
							</Box>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	)
}
