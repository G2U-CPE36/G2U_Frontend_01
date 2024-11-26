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
import Translate from "@/components/Translate"
import InputAdornment from "@mui/material/InputAdornment"

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

const productTag = ["First-hand", "Second-hand", "Any"]

export default function AddProductForm({ formType, data }) {
	const { register, handleSubmit } = useForm()
	const [formData, setFormData] = useState(data || {})
	const [imagePreviews, setImagePreviews] = useState([])

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
		files.forEach((file) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				setImagePreviews((prev) => [...prev, e.target.result])
			}
			reader.readAsDataURL(file)
		})
	}

	const onSubmit = async (data) => {
		const newData = { ...data, images: imagePreviews }
		console.log(isWTB ? "Form Type: WTB" : "Form Type: WTS")
		console.log(newData)
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
									startAdornment: <InputAdornment position="start">฿</InputAdornment>, // Adds the currency symbol at the start
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
									<Translate text={isWTB ? "Lookingforfirsthandsecondhand": "Selectaproducttag"} />
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
							<VisuallyHiddenInput type="file" multiple onChange={handleImageUpload} />
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
