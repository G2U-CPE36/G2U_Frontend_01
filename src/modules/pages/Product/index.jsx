import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"; // Import useParams
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import { Button } from "@mui/material"
import { formatNumber } from "@/helper/func"

const mockproduct = {
	id: 5,
	title: "Tefal เตารีดแรงดันไอน้ำ Express COMPACT SV7120",
	images: {
		image1: "/tee1.png",
		image2: "/tee2.png",
		image3: "/tee3.png",
		image4: "/tee4.png",
		image5: "/tee5.png",
	},
	postBy: "Teeboy",
	postDate: new Date().toISOString(),
	price: 2634.5691,
	condition: "Second hand",
	description: `
Product details of Tefal เตารีดแรงดันไอน้ำ Express COMPACT รุ่น SV7120:
- รีดเรียบเร็ว ด้วยแรงดันไอน้ำ 6 บาร์
- พลังไอน้ำต่อเนื่อง 120 กรัม/นาที พลังไอน้ำเพิ่มพิเศษ 350 กรัม/นาที
- แผ่นหน้าเตารีด Xpress Glide
- ความจุแทงค์น้ำ 1.7 ลิตร สามารถรีดผ้าแนวตั้งได้
- Manual setting ปรับอุณหภูมิ และไอน้ำได้ตามต้องการ
- มีระบบ Eco mode ช่วยประหยัดพลังงาน
- ช้อนดักตะกรัน Calc collector ช่วยขจัดตะกรันได้อย่างง่ายดายหมดจด
- ส่งฟรี
- ประกัน 2 ปี
  `,
}

export default function ProductDetail() {
	const { productID } = useParams() // Extract productID from the URL
	const [product, setProduct] = useState(null)
	const [error, setError] = useState("")
	const [image, setImage] = useState(null)

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await fetch(`http://chawit.tshddns.net:9790/api/products/${productID}`)
				if (!response.ok) throw new Error("Failed to fetch product")
				const productData = await response.json()
				setProduct(productData)
				setImage(productData.images?.image1 || "")
			} catch (error) {
				console.error(error.message)
				console.log("Failed to load product from the server. Using mock data.")
				setProduct(mockproduct)
				setImage(mockproduct.images.image1)
			}
		}

		getProducts()
	}, [productID]) // Run useEffect when productID changes

	if (!product) {
		return <p>Loading product details...</p>
	}

	const imageArray = Object.values(product.images)

	return (
		<div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
			{/* Left Section: Images */}
			<div className="lg:w-2/5 flex flex-col items-center">
				<div className="w-full h-96 flex items-center justify-center border rounded-lg overflow-hidden">
					<img alt={image} className="object-contain h-full" src={image} />
				</div>
				<div className="flex mt-4 gap-2">
					{imageArray.map((img, index) => (
						<button
							key={index}
							type="button"
							onClick={() => setImage(img)}
							className={`border rounded-lg overflow-hidden p-1 ${
								image === img ? "border-blue-500" : "border-gray-300"
							}`}
						>
							<img alt={`Thumbnail ${index}`} className="w-20 h-20 object-contain" src={img} />
						</button>
					))}
				</div>
			</div>

			{/* Right Section: Product Details */}
			<div className="lg:w-3/5 flex flex-col">
				{/* Title and Wishlist Icon */}
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-3xl text-gray-800">{product.title}</h1>
					<FavoriteBorderIcon fontSize="large" className="text-gray-600 cursor-pointer" />
				</div>

				{/* Price Section */}
				<div className="mt-3">
					<p className="text-4xl font-semibold text-green-600">฿ {formatNumber(product.price)}</p>
				</div>

				{/* Post Information */}
				<div className="flex gap-5 mt-4 text-gray-500 text-sm">
					<p>
						By <span className="underline underline-offset-2">{product.postBy}</span>
					</p>
					<p>Post Date: {new Date(product.postDate).toLocaleDateString()}</p>
				</div>

				{/* Category Section */}
				<div className="mt-4">
					<h2 className="font-semibold text-lg">Category:</h2>
					<p className="text-gray-700">{product.condition}</p>
				</div>

				{/* Product Description */}
				<div className="mt-6">
					<h2 className="font-semibold text-lg">Product Description:</h2>
					<p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
						{product.description}
					</p>
				</div>

				{/* Buy Button */}
				<Button
					variant="contained"
					startIcon={<ShoppingCartCheckoutIcon />}
					className="mt-6"
					style={{
						backgroundColor: "#4CAF50",
						color: "white",
						padding: "10px 20px",
						borderRadius: "5px",
					}}
				>
					Buy Product
				</Button>
			</div>
		</div>
	)
}
