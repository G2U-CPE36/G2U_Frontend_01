import React, { useState } from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { styled } from "@mui/material/styles"
import { useForm } from "react-hook-form"

export default function LookingToBuy() {
	const { register, handleSubmit } = useForm()

	const ariaLabel = { "aria-label": "description" }
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

	// State for form fields
	const [formData, setFormData] = useState({
		productName: "",
		priceRange: "",
		category: "",
		productDetails: "",
	})
	const [imagePreview, setImagePreview] = useState(null) // State for uploaded image preview

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
			const reader = new FileReader()
			reader.onload = () => {
				setImagePreview(reader.result) // Set the image preview
			}
			reader.readAsDataURL(file)
		}
		console.log(event)
	}

	// Handle form submission
	async function onSubmit(data) {
		const newData = {
			...data,
			imagePreview,
		}

		console.log(newData)
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
			{/* Top Section */}
			<Box
				sx={{
					width: "100%",
					m: 2,
				}}
			>
				<Typography variant="h3">What would you like to buy?</Typography>
			</Box>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Bottom Section */}
				<Box
					sx={{
						display: "flex",
						width: "100%",
						flex: 1,
					}}
				>
					{/* Left Side */}
					<Box
						sx={{
							flex: 6,
							display: "flex",
							flexDirection: "column",
							p: 2,
						}}
					>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
							}}
							noValidate
							autoComplete="off"
						>
							<Typography variant="h6">Product Name</Typography>
							<TextField
								id="productName"
								type="text"
								{...register("productName")}
								placeholder="What product are you looking for?"
								value={formData.productName}
								onChange={handleInputChange}
							/>

							<Typography variant="h6">Price Range</Typography>
							<TextField
								id="priceRange"
								type="text"
								{...register("priceRange")}
								placeholder="What is your preferred price range?"
								value={formData.priceRange}
								onChange={handleInputChange}
							/>

							<Typography variant="h6">Category</Typography>
							<TextField
								id="category"
								type="text"
								{...register("category")}
								placeholder="What category does this product belong to?"
								value={formData.category}
								onChange={handleInputChange}
							/>

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

					{/* Right Side */}
					<Box
						sx={{
							flex: 4,
							display: "flex",
							flexDirection: "column",
							p: 2,
						}}
					>
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
							<Box
								sx={{
									mt: 2,
									width: "100%",
									display: "flex",
									justifyContent: "center",
								}}
							>
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
