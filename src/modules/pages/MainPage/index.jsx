import { useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import SearchIcon from "@mui/icons-material/Search"
import Translate from "@/components/Translate"

export default function MainPage() {
	const [category, setCategory] = useState("")
	const [priceRange, setPriceRange] = useState("")
	const [province, setProvince] = useState("")
	const [searchQuery, setSearchQuery] = useState("")
	const [products, setProducts] = useState([]); // For API data
	const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
	const [error, setError] = useState(""); // For error handling

	const handleCategoryChange = (event) => setCategory(event.target.value)
	const handlePriceRangeChange = (event) => setPriceRange(event.target.value)
	const handleProvinceChange = (event) => setProvince(event.target.value)
	const handleSearchChange = (event) => setSearchQuery(event.target.value.toLowerCase())

	const clearFilters = () => {
		setCategory("")
		setPriceRange("")
		setProvince("")
		setSearchQuery("")
	}

	const handleImageError = (e) => {
		e.target.src = "/pic/default.jpg" // Set fallback image path
	}

	// const products = [
	// 	{
	// 		id: 1,
	// 		name: "Smartphone",
	// 		category: "electronics",
	// 		priceRange: "100-200",
	// 		province: "Bangkok",
	// 		condition: "New",
	// 		image: "/pic/Smartphone.jpg",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Laptop",
	// 		category: "electronics",
	// 		priceRange: "200+",
	// 		province: "Chiangmai",
	// 		condition: "Used - Good",
	// 		image: "/pic/Laptop.jpg",
	// 	},
    // {
	// 		id: 3,
	// 		name: "Smartphone",
	// 		category: "electronics",
	// 		priceRange: "100-200",
	// 		province: "Bangkok",
	// 		condition: "New",
	// 		image: "/pic/Smartphone.jpg",
	// 	},
	// 	{
	// 		id: 4,
	// 		name: "Laptop",
	// 		category: "electronics",
	// 		priceRange: "200+",
	// 		province: "Chiangmai",
	// 		condition: "Used - Good",
	// 		image: "/pic/Laptop.jpg",
	// 	},
    // {
	// 		id: 5,
	// 		name: "Smartphone",
	// 		category: "electronics",
	// 		priceRange: "100-200",
	// 		province: "Bangkok",
	// 		condition: "New",
	// 		image: "/pic/Smartphone.jpg",
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Laptop",
	// 		category: "electronics",
	// 		priceRange: "200+",
	// 		province: "Chiangmai",
	// 		condition: "Used - Good",
	// 		image: "/pic/Laptop.jpg",
	// 	},
	// 	// Add other products here
	// ]

	// const filteredProducts = products.filter((product) => {
	// 	const matchesCategory = category ? product.category === category : true
	// 	const matchesPriceRange = priceRange ? product.priceRange === priceRange : true
	// 	const matchesProvince = province ? product.province === province : true
	// 	const matchesSearchQuery = searchQuery ? product.name.toLowerCase().includes(searchQuery) : true
	// 	return matchesCategory && matchesPriceRange && matchesProvince && matchesSearchQuery
	// })

	uuseEffect(() => {
		const fetchAllProducts = async () => {
			try {
				const response = await fetch("/api/products/getproducts");
				if (!response.ok) throw new Error("Failed to fetch liked products");
				const data = await response.json();
				setProducts(data); // Set fetched data
				setFilteredProducts(data); // Initialize with all products
			} catch (error) {
				console.error("Error fetching liked products:", error);
				setError("Failed to load products. Please try again later.");
			}
		};

		fetchAllProducts();
	}, []);

	useEffect(() => {
		const filtered = products.filter((product) => {
			const matchesCategory = category ? product.category === category : true;
			const matchesPriceRange = priceRange ? product.priceRange === priceRange : true;
			const matchesProvince = province ? product.province === province : true;
			const matchesSearchQuery = searchQuery ? product.name.toLowerCase().includes(searchQuery) : true;
			return matchesCategory && matchesPriceRange && matchesProvince && matchesSearchQuery;
		});
		setFilteredProducts(filtered);
	}, [products, category, priceRange, province, searchQuery]);

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
							<MenuItem value="electronics">
								<Translate text="Electronics" />
							</MenuItem>
							<MenuItem value="clothing">
								<Translate text="Clothing" />
							</MenuItem>
							<MenuItem value="books">
								<Translate text="Books" />
							</MenuItem>
							<MenuItem value="furniture">
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
							value={priceRange}
							label="Price Range"
							onChange={handlePriceRangeChange}
							sx={{
								backgroundColor: "#333652", // Dropdown background color
								height: "52px", // Set height for a slimmer appearance
								color: "#FFFFFF", // Dropdown text color
								borderRadius: "6px",
								"& .MuiSvgIcon-root": {
									color: "#FFFFFF", // Arrow dropdown color
								},
							}}
						>
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
				}}
			>
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => (
						<Box
							key={product.id}
							sx={{
								backgroundColor: "#ffffff", // Card background color
								padding: 2,
								borderRadius: "8px", // Rounded corners
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								alignItems: "center",
								boxShadow: "2px 6px 8px rgba(0, 0, 0, 0.3)", // Subtle shadow
								height: "100%", // Fixed height for uniform size
                width: "100%"
							}}
						>
							{/* Image */}
							<Box
								sx={{
									width: "350px", // Fixed width
									height: "320px", // Fixed height (same as width for square)
									backgroundColor: "#c0c0c0", // Placeholder background
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
										objectFit: "cover", // Ensures the image scales proportionally
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
								<h2 style={{ fontWeight: "bold", fontSize: "1rem" }}>{product.name}</h2>
								<p style={{ color: "#757575", fontSize: "0.9rem" }}>{product.province}</p>
								<p style={{ color: "#d32f2f", fontWeight: "bold", fontSize: "1rem" }}>{product.condition}</p>
								<Box sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
									฿ {product.priceRange}
								</Box>
							</Box>

							{/* Action Buttons */}
							<Box
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginTop: "8px",
								}}
							>
              </Box>
						</Box>
					))
				) : (
					<p
						style={{
							gridColumn: "span 4",
							textAlign: "center",
							color: "#757575",
						}}
					>
						<Translate text="No products found." />
					</p>
				)}
			</Box>
		</Box>
	)
}
