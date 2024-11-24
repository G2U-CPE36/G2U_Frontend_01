import * as React from "react"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import ProductCard from "@/components/ProductCard"
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Translate from "@/components/Translate"

export default function MyPosts() {
	const [category, setCategory] = React.useState("forSale")
	const [status, setStatus] = React.useState("ongoing")
	const [posts, setPosts] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(null)

	const filteredPosts = posts.filter((post) => post.category === category && post.status === status)

	const mockPosts = [
		{
			productID: 1,
			name: "Product 1",
			province: "Bangkok",
			price: 200,
			image: "/images/product1.jpeg",
			category: "forSale",
			status: "ongoing",
		},
		{
			productID: 2,
			name: "Product 2",
			province: "Pattaya",
			price: 250,
			image: "/images/product4.jpg",
			category: "forSale",
			status: "ongoing",
		},
		{
			productID: 3,
			name: "Product 3",
			province: "Rayong",
			price: 800,
			image: "/images/product3.jpg",
			category: "forSale",
			status: "ongoing",
		},
		{
			productID: 4,
			name: "Product 4",
			province: "Bangkok",
			price: 999,
			image: "/images/product2.jpg",
			category: "forSale",
			status: "ongoing",
		},
		{
			productID: 5,
			name: "Product 5",
			province: "Chiang Mai",
			price: 300,
			image: "/images/product2.jpg",
			category: "lookingToBuy",
			status: "ongoing",
		},
		{
			productID: 6,
			name: "Product 6",
			province: "Phuket",
			price: 400,
			image: "/images/product3.jpg",
			category: "forSale",
			status: "closed",
		},
		{
			productID: 7,
			name: "Product 7",
			province: "Nan",
			price: 650,
			image: "/images/product4.jpg",
			category: "lookingToBuy",
			status: "closed",
		},
	]

	React.useEffect(() => {
		const fetchAllPost = async () => {

			try {
				const response = await fetch("http://localhost:3001/api/products/getproducts")
				if (!response.ok) throw new Error("Failed to fetch liked post")
				const data = await response.json()
				setPosts(data) // Set fetched data
				setLoading(false)
			} catch (error) {
				// if (error.name === "AbortError") {
				// 	console.error("Fetch request timed out")
				// } else {
				// 	console.error("Error:", error.message)
				// }
				// setPosts(mockPosts) // Use mock data as fallback
				console.error("Error fetching liked products:", error)
				setError("Failed to load pages. Please try again later.",error.message)
			}
		}

		// Try fetching data and retry if it fails
		const retryFetch = () => {
			let attempts = 0
			const maxAttempts = 10 // 10 attempts, 1 per second
			const intervalId = setInterval(() => {
				if (attempts < maxAttempts) {
					fetchAllPost()
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

	// if (error) {
	// 	return (
	// 		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
	// 			<Typography variant="h6" color="error">
	// 				{error}
	// 			</Typography>
	// 		</Box>
	// 	)
	// }

	// React.useEffect(() => {
	// 	setTimeout(() => {
	// 		setPosts(mockPosts)
	// 		setLoading(false)
	// 	}, 10)
	// }, [])

	const handleCategoryChange = (event) => {
		setCategory(event.target.value)
	}

	const handleStatusChange = (event) => {
		setStatus(event.target.value)
	}

	const navigate = useNavigate()

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	if (error) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Typography variant="h6" color="error">
					{error}
				</Typography>
			</Box>
		)
	}

	return (
		<Box sx={{ display: "flex", m: 2 }}>
			{/* Profile Card */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					p: 2,
					minWidth: "300px",
					height: "335px",
					border: "1px solid #ccc",
					borderRadius: "8px",
					bgcolor: "background.paper",
					mb: 4,
					mr: 2,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mb: 1,
					}}
				>
					<Avatar
						alt="User Profile Picture"
						src="/path-to-profile-picture.jpg"
						sx={{ width: 100, height: 100, mb: 1 }}
					/>
					<Typography variant="h6">@Username</Typography>
					<Typography variant="body2" color="textSecondary">
						<Translate text="JoinSince" /> 24/06/2020
					</Typography>
				</Box>

				<Box>
					<FormControl fullWidth>
						<Typography variant="subtitle1">
							<Translate text="Categories" />{" "}
						</Typography>
						<RadioGroup row value={category} onChange={handleCategoryChange}>
							<FormControlLabel
								value="forSale"
								control={<Radio />}
								label=<Translate text="catergories_sell" />
							/>
							<FormControlLabel
								value="lookingToBuy"
								control={<Radio />}
								label=<Translate text="catergories_buy" />
							/>
						</RadioGroup>
					</FormControl>

					<FormControl fullWidth>
						<Typography variant="subtitle1">Status</Typography>
						<RadioGroup row value={status} onChange={handleStatusChange}>
							<FormControlLabel value="ongoing" control={<Radio />} label=<Translate text="Status_Open" /> />
							<FormControlLabel value="closed" control={<Radio />} label=<Translate text="Status_Close" /> />
						</RadioGroup>
					</FormControl>
				</Box>
			</Box>

			{/* Posts Section */}
			<Box
				sx={{
					flexGrow: 1,
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: 2,
					mb: 10,
				}}
			>
				{filteredPosts.length > 0 ? (
					filteredPosts.map((post) => <ProductCard key={post.id} product={post} layoutType="mypost" />)
				) : (
					<Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", gridColumn: "span 3" }}>
						No posts match your filters.
					</Typography>
				)}
			</Box>
		</Box>
	)
}
