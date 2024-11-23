import React, { useState } from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { styled } from "@mui/material/styles"
import { useForm } from "react-hook-form"

export default function LookingToBuy() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

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
	}

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log(event)
		// try {
		// 	const response = await fetch("/myposts/wtb", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(formData),
		// 	})
		// 	if (response.ok) {
		// 		alert("Post submitted successfully!")
		// 	} else {
		// 		alert("Failed to submit post.")
		// 	}
		// } catch (error) {
		// 	console.error("Error submitting the form:", error)
		// 	alert("An error occurred. Please try again.")
		// }
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
          <form>

          
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
						}}
						noValidate
						autoComplete="off"
					>
						<Typography variant="h6">Product Name</Typography>
						<OutlinedInput
							name="productName"
							placeholder="What product are you looking for?"
							value={formData.productName}
							onChange={handleInputChange}
							inputProps={ariaLabel}
						/>

						<Typography variant="h6">Price Range</Typography>
						<OutlinedInput
							name="priceRange"
							placeholder="What is your preferred price range?"
							value={formData.priceRange}
							onChange={handleInputChange}
							inputProps={ariaLabel}
						/>

						<Typography variant="h6">Category</Typography>
						<OutlinedInput
							name="category"
							placeholder="What category does this product belong to?"
							value={formData.category}
							onChange={handleInputChange}
							inputProps={ariaLabel}
						/>

						<Typography variant="h6">Product Details</Typography>
						<OutlinedInput
							name="productDetails"
							placeholder="Briefly describe the product you are looking for."
							value={formData.productDetails}
							onChange={handleInputChange}
							multiline
							minRows={6}
							inputProps={ariaLabel}
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
        </form>
        
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
		</Container>
	)
}
