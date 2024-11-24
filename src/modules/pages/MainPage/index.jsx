import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import SearchIcon from "@mui/icons-material/Search"
import Translate from "@/components/Translate"
import ProductCard from "@/components/ProductCard"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
	const [category, setCategory] = useState("")
	const [maxPrice, setMaxPrice] = useState("")
	const [province, setProvince] = useState("")
	const [searchQuery, setSearchQuery] = useState("")
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const mockData = [
		{
			productID: 1,
			name: "iPhone 13",
			categoryId: 1, // Electronics
			price: "150",
			province: "Bangkok",
			condition: "New",
			image: "/pic/Smartphone.jpg",
		},
		{
			productID: 2,
			name: "MacBook Pro",
			categoryId: 1, // Electronics
			price: "300",
			province: "Chiangmai",
			condition: "Used - Good",
			image: "/pic/Laptop.jpg",
		},
		{
			productID: 3,
			name: "Harry Potter Book Set",
			categoryId: 2, // Books
			price: "100",
			province: "Phuket",
			condition: "New",
			image: "/pic/Books.jpg",
		},
		{
			productID: 4,
			name: "Men's Jacket",
			categoryId: 3, // Clothing
			price: "50",
			province: "Khon Kaen",
			condition: "New",
			image: "/pic/Clothing.jpg",
		},
		{
			productID: 5,
			name: "Dining Table Set",
			categoryId: 9, // Furniture
			price: "200",
			province: "Bangkok",
			condition: "Used - Good",
			image: "/pic/Furniture.jpg",
		},
	]
	const handleCategoryChange = (event) => setCategory(event.target.value)
	const handleMaxPriceChange = (event) => setMaxPrice(event.target.value)
	const handleProvinceChange = (event) => setProvince(event.target.value)
	const handleSearchChange = (event) => setSearchQuery(event.target.value.toLowerCase())

	const handleImageError = (e) => {
		e.target.src = "/pic/default.jpg"
	}

	useEffect(() => {
		const fetchAllProducts = async () => {
			try {
				const response = await fetch("http://chawit.tshddns.net:9790/api/products/getproductss")
				if (!response.ok) throw new Error("Failed to fetch products")
				const data = await response.json()
				console.log("Fetched Products from API:", data)
				setProducts(data) // Set fetched data
				setFilteredProducts(data) // Initialize with all products
			} catch (error) {
				setError("Failed to load products from the server. Using mock data.")
				setProducts(mockData) // Use mock data as fallback
				setFilteredProducts(mockData) // Initialize filtered data with mock data
			}
		}

		fetchAllProducts()
	}, [])

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
			const matchesSearchQuery = searchQuery ? product.name.toLowerCase().includes(searchQuery) : true
			return matchesCategory && matchesMaxPrice && matchesProvince && matchesSearchQuery
		})
		setFilteredProducts(filtered)
	}, [products, category, maxPrice, province, searchQuery])

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
							<MenuItem value="9">
								<Translate text="Furniture" />
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

				<Box sx={{ width: "100%", mr: 4 }}>
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
							<MenuItem value="chiangmai">Chiang Mai</MenuItem>
							<MenuItem value="phuket">Phuket</MenuItem>
							<MenuItem value="khonkaen">Khon Kaen</MenuItem>
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
					cursor: "pointer",
				}}
			>
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} layoutType="mainPage" />
				))}
			</Box>
		</Box>
	)
}
