import * as React from "react"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function MyPosts() {
	const [category, setCategory] = React.useState("forSale")
	const [status, setStatus] = React.useState("ongoing")
	const [posts, setPosts] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(null)

	const filteredPosts = posts.filter((post) => post.category === category && post.status === status)

	const mockPosts = [
		{
			id: 1,
			name: "Product 1",
			province: "Bangkok",
			price: 200,
			image: "/images/product1.jpeg",
			category: "forSale",
			status: "ongoing",
		},
		{
			id: 2,
			name: "Product 2",
			province: "Pattaya",
			price: 250,
			image: "/images/product4.jpg",
			category: "forSale",
			status: "ongoing",
		},
		{
			id: 3,
			name: "Product 3",
			province: "Rayong",
			price: 800,
			image: "/images/product3.jpg",
			category: "forSale",
			status: "ongoing",
		},
		{
			id: 4,
			name: "Product 4",
			province: "Bangkok",
			price: 999,
			image: "/images/product2.jpg",
			category: "forSale",
			status: "ongoing",
		},
		{
			id: 5,
			name: "Product 5",
			province: "Chiang Mai",
			price: 300,
			image: "/images/product2.jpg",
			category: "lookingToBuy",
			status: "ongoing",
		},
		{
			id: 6,
			name: "Product 6",
			province: "Phuket",
			price: 400,
			image: "/images/product3.jpg",
			category: "forSale",
			status: "closed",
		},
		{
			id: 7,
			name: "Product 7",
			province: "Nan",
			price: 650,
			image: "/images/product4.jpg",
			category: "lookingToBuy",
			status: "closed",
		},
	]

	React.useEffect(() => {
		setTimeout(() => {
			setPosts(mockPosts)
			setLoading(false)
		}, 10)
	}, [])

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
					width: "300px",
					height: "335px",
					border: "1px solid #ccc",
					borderRadius: "8px",
					bgcolor: "background.paper",
					mb: 40,
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
						Joined since 24/06/2020
					</Typography>
				</Box>

				<Box>
					<FormControl fullWidth>
						<Typography variant="subtitle1">Category</Typography>
						<RadioGroup row value={category} onChange={handleCategoryChange}>
							<FormControlLabel value="forSale" control={<Radio />} label="For Sale" />
							<FormControlLabel value="lookingToBuy" control={<Radio />} label="Looking to Buy" />
						</RadioGroup>
					</FormControl>

					<FormControl fullWidth>
						<Typography variant="subtitle1">Status</Typography>
						<RadioGroup row value={status} onChange={handleStatusChange}>
							<FormControlLabel value="ongoing" control={<Radio />} label="Ongoing" />
							<FormControlLabel value="closed" control={<Radio />} label="Closed" />
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
					gap: 1,
					mb: 10,
					width: "calc(100% - 320px)",
				}}
			>
				{filteredPosts.length > 0 ? (
					filteredPosts.map((post) => (
						<Box
							key={post.id}
							onClick={() => navigate(`/productDetail/${post.id}`)}
							sx={{
								height: "320px",
								border: "1px solid #ccc",
								borderRadius: "8px",
								bgcolor: "background.paper",
								p: 2,
								display: "flex",
								flexDirection: "column",
								alignItems: "left",
								cursor: "pointer",
								"&:hover": {
									boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
								},
							}}
						>
							<img
								src={post.image}
								alt={post.name}
								style={{
									width: "100%",
									height: "220px",
									objectFit: "cover",
									borderRadius: "8px",
								}}
							/>
							<Typography variant="h6">{post.name}</Typography>
							<Typography variant="body2" color="textSecondary">
								{post.province}
							</Typography>
							<Typography variant="body2" color="primary">
								฿{post.price}
							</Typography>
						</Box>
					))
				) : (
					<Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", gridColumn: "span 3" }}>
						No posts match your filters.
					</Typography>
				)}
			</Box>
		</Box>
	)
}
