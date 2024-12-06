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
import axios from "axios"
import Translate from "@/components/Translate"
import InputAdornment from "@mui/material/InputAdornment"
import { useNavigate } from "react-router-dom"
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

const categories = [
	"Electronics",
	"Books",
	"Clothing",
	"Home",
	"Sports",
	"Beauty",
	"Toys",
	"Groceries",
	"Furniture",
	"Automotive",
]

const productTag = ["First-hand", "Second-hand"]

export default function AddProductForm({ formType, data }) {
	const { register, handleSubmit } = useForm()
	const [formData, setFormData] = useState(data || {})
	const [images, setImages] = useState([]) // Store selected image files
	const [imagePreviews, setImagePreviews] = useState([]) // Store preview URLs

	const navigate = useNavigate()

	const isWTB = formType === "wtb"

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageUpload = (event) => {
		const files = Array.from(event.target.files)
		if (files.length + images.length > 5) {
			alert("You can upload up to 5 images only.")
			return
		}

		const validFiles = files.filter((file) => file.type.startsWith("image/"))
		if (validFiles.length !== files.length) {
			alert("Some files are not valid images.")
			return
		}

		const newImages = [...images, ...validFiles]
		const newPreviews = [...imagePreviews, ...validFiles.map((file) => URL.createObjectURL(file))]

		setImages(newImages)
		setImagePreviews(newPreviews)
	}

	const onSubmit = async (data) => {
		const userId = localStorage.getItem("userId")
		let categoryId = "1"
		const productImage = document.querySelector('input[type="file"]').files[0] // Get the file
		if (formData.category === "Electronics") {
			// Category 1
			categoryId = "1"
		} else if (formData.category === "Books") {
			// Category 2
			categoryId = "2"
		} else if (formData.category === "Clothing") {
			// Category 3
			categoryId = "3"
		} else if (formData.category === "Home") {
			// Category 4
			categoryId = "4"
		} else if (formData.category === "Sports") {
			// Category 5
			categoryId = "5"
		} else if (formData.category === "Beauty") {
			// Category 6
			categoryId = "6"
		} else if (formData.category === "Toys") {
			// Category 7
			categoryId = "7"
		} else if (formData.category === "Groceries") {
			// Category 8
			categoryId = "8"
		} else if (formData.category === "Furniture") {
			// Category 9
			categoryId = "9"
		} else if (formData.category === "Automotive") {
			// Category 10
			categoryId = "10"
		} else {
			// Unknown category
			console.log("Category not found")
			return
		}

		console.log(data.categories)

		if (!productImage) {
			console.error("No image file selected.")
			return
		}

		try {
			const formDataToSend = new FormData()
			formDataToSend.append("userId", userId)
			formDataToSend.append("productName", data.productName)
			formDataToSend.append("categoryId", categoryId)
			formDataToSend.append("productDescription", data.productDetails)
			formDataToSend.append("price", data.priceRange)
			formDataToSend.append("condition", data.productTag)
			images.forEach((image, index) => {
				formDataToSend.append(`productImage`, image) // Same key for all images
			})

			if ((formType = "wtb")) {
				const response = await axios.post(
					"http://chawit.thddns.net:9790/api/openorders/create",
					formDataToSend,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				)
				if (response.status < 200 || response.status >= 300) {
					throw new Error("Failed to create post")
				} else {
					console.log("Post created successfully:", response.data)
					alert("Post created successfully")
					navigate("/")
				}
			} else {
				const response = await axios.post(
					"http://chawit.thddns.net:9790/api/products/create",
					formDataToSend,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				)
				if (response.status < 200 || response.status >= 300) {
					throw new Error("Failed to create post")
				} else {
					console.log("Post created successfully:", response.data)
					alert("Post created successfully")
					navigate("/")
				}
			}

			console.log("Product saved")
		} catch (error) {
			console.error("Error saving product:", error)
		}
	}

	return (
		<Container
			sx={{
				mt: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Box sx={{ width: "100%" }}>
				<Typography variant="h3">
					<Translate text={isWTB ? "Whatwouldyouliketobuy" : "Addaproduct"} />
				</Typography>
			</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box sx={{ display: "flex", width: "100%", flex: 1 }}>
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
								required
								id="productName"
								type="text"
								label={<Translate text={isWTB ? "Whatproductareyoulookingfor" : "Whatproductareyouadding"} />}
								{...register("productName")}
								value={formData.productName || ""}
								onChange={handleInputChange}
							/>
							<Typography variant="h6">
								<Translate text="PriceRange" />
							</Typography>
							<TextField
								required
								id="priceRange"
								type="number"
								label={<Translate text={isWTB ? "Enteryourpreferredprice" : "Entertheproductprice"} />}
								{...register("priceRange")}
								value={formData.priceRange || ""}
								onChange={handleInputChange}
								InputProps={{
									startAdornment: <InputAdornment position="start">฿</InputAdornment>,
								}}
							/>
							<Typography variant="h6">
								<Translate text="productTag" />
							</Typography>
							<Select
								required
								id="productTag"
								labelId="tag-label"
								{...register("productTag")}
								value={formData.productTag || ""}
								onChange={handleInputChange}
								name="productTag"
								displayEmpty
							>
								<MenuItem value="" disabled>
									<Translate text={isWTB ? "Lookingforfirsthandsecondhand" : "Selectaproducttag"} />
								</MenuItem>
								{productTag.map((productTag) => (
									<MenuItem key={productTag} value={productTag}>
										{productTag}
									</MenuItem>
								))}
							</Select>

							<Typography variant="h6">
								<Translate text="Category" />
							</Typography>
							<Select
								required
								id="category"
								labelId="category-label"
								{...register("category")}
								value={formData.category || ""}
								onChange={handleInputChange}
								name="category"
								displayEmpty
							>
								<MenuItem value="" disabled>
									<Translate text="Selectacategory" />
								</MenuItem>
								{categories.map((category) => (
									<MenuItem key={category} value={category}>
										{category}
									</MenuItem>
								))}
							</Select>
							<Typography variant="h6">
								<Translate text="ProductDetails" />
							</Typography>
							<TextField
								required
								id="productDetails"
								type="text"
								label={<Translate text="Describeproductdetails" />}
								{...register("productDetails")}
								value={formData.productDetails || ""}
								onChange={handleInputChange}
								multiline
								minRows={6}
							/>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 2, backgroundColor: "#333652", color: "white" }}
							>
								<Translate text="Submit" />
							</Button>
						</Box>
					</Box>
					<Box sx={{ flex: 4, display: "flex", flexDirection: "column", p: 2 }}>
						<Typography variant="h6" gutterBottom>
							<Translate
								text={
									isWTB
										? "Uploadanimagetoprovidemoreclarityaboutyourneeds"
										: "Uploadanimagetoshowcaseyourproduct"
								}
							/>
						</Typography>
						<Button
							component="label"
							variant="contained"
							startIcon={<AddIcon />}
							sx={{ color: "white", backgroundColor: "#333652" }}
						>
							<Translate text="IMAGES" />
							<VisuallyHiddenInput
								type="file"
								multiple // Allow multiple file uploads
								onChange={handleImageUpload}
							/>
						</Button>
						<Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
							{imagePreviews.map((preview, index) => (
								<img
									key={index}
									src={preview}
									alt={`Uploaded Preview ${index + 1}`}
									style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "8px" }}
								/>
							))}
						</Box>
					</Box>
				</Box>
			</form>
		</Container>
	)
}
