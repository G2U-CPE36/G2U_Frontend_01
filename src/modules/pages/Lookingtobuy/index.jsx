import { useState } from "react"
import { useForm } from "react-hook-form"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Translate from "@/components/Translate"
import axios from "axios" // Import axios for API calls
// Styled component for visually hidden input (used for file upload)
const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
})

// Category choices
const categories = [
	"electronic",
	"pets",
	"watch",
	"fashion",
	"music",
	"shoes",
	"sports",
	"camera",
	"bags",
	"mom&kid",
	"education",
	"game",
]

export default function LookingToBuy() {
	// Form handling
	const { register, handleSubmit } = useForm()

	// State for form fields and image preview
	const [formData, setFormData] = useState({
		productName: "",
		priceRange: "",
		category: "",
		productDetails: "",
	})
	const [imagePreview, setImagePreview] = useState(null)

	// Handle form field changes
	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	// Handle image upload
	const handleImageUpload = (event) => {
		const file = event.target.files[0]
		if (file) {
			setImagePreview(URL.createObjectURL(file)) // Preview the image
		}
	}

	const onSubmit = async (data) => {
		const userId = 1
		const productName = "test product"
		const categoryId = 2
		const productDescription = "hello world"
		const price = 20.0
		const productImage = document.querySelector('input[type="file"]').files[0] // Get the file
		const condition = "new"

		try {
			const formData = new FormData()
			formData.append("userId", userId)
			formData.append("productName", productName)
			formData.append("categoryId", categoryId)
			formData.append("productDescription", productDescription)
			formData.append("price", price)
			formData.append("condition", condition)
			formData.append("productImage", productImage) // Append the Blob/File object

			const response = await axios.post("http://chawit.thddns.net:9790/api/products/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})

			console.log("Product saved;", response.data)
		} catch (error) {
			console.error("Error marking product;", error)
		}
	}

	return (
		<Container
			sx={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			{/* Header Section */}
			<Box sx={{ width: "100%", m: 2 }}>
				<Typography variant="h3">
					<Translate text="Whatwouldyouliketobuy" />
				</Typography>
			</Box>

			{/* Form Section */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						flex: 1,
					}}
				>
					{/* Left Section: Form Inputs */}
					<Box sx={{ flex: 6, display: "flex", flexDirection: "column", p: 2 }}>
						<Box
							sx={{ width: "100%", display: "flex", flexDirection: "column" }}
							noValidate
							autoComplete="off"
						>
							<Typography variant="h6">
								<Translate text="ProductName" />
							</Typography>
							<TextField
								id="productName"
								type="text"
								label={<Translate text="Whatproductareyoulookingfor" />}
								{...register("productName")}
								value={formData.productName}
								onChange={handleInputChange}
							/>

							<Typography variant="h6">
								<Translate text="PriceRange" />
							</Typography>
							<TextField
								id="priceRange"
								type="text"
								label={<Translate text="Whatisyourpreferredpricerange" />}
								{...register("priceRange")}
								value={formData.priceRange}
								onChange={handleInputChange}
							/>

							<Typography variant="h6">Category</Typography>
							<FormControl fullWidth sx={{ mt: 1 }}>
								<InputLabel id="category-label">Select a category</InputLabel>
								<Select
									id="category"
									labelId="category-label"
									{...register("category")}
									value={formData.category}
									onChange={handleInputChange}
									name="category"
									label="Selectacategory"
								>
									{categories.map((category) => (
										<MenuItem key={category} value={category}>
											{category}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<Typography variant="h6">Product Details</Typography>
							<TextField
								id="productDetails"
								type="text"
								{...register("productDetails")}
								placeholder="Briefly describe the product you are looking for."
								value={formData.productDetails}
								onChange={handleInputChange}
								multiline
								minRows={6}
							/>

							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 2, backgroundColor: "#333652", color: "white" }}
							>
								Submit
							</Button>
						</Box>
					</Box>

					{/* Right Section: Image Upload */}
					<Box sx={{ flex: 4, display: "flex", flexDirection: "column", p: 2 }}>
						<Typography variant="h6" gutterBottom>
							Upload an image to help others better understand your needs.
						</Typography>
						<Button
							component="label"
							variant="contained"
							startIcon={<AddIcon />}
							sx={{ width: 100, color: "white", backgroundColor: "#333652" }}
						>
							IMAGE
							<VisuallyHiddenInput type="file" onChange={handleImageUpload} />
						</Button>

						{/* Image Preview */}
						{imagePreview && (
							<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
								<img
									src={imagePreview}
									alt="Uploaded Preview"
									style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }}
								/>
							</Box>
						)}
					</Box>
				</Box>
			</form>
		</Container>
	)
}
