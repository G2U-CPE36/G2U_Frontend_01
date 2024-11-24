// import { useParams } from "react-router-dom"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { formatNumber } from "@/helper/func"
import { useState } from "react"
import { Button } from "@mui/material"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"

const product = {
	id: 5,
	title: "Tefal เตารีดแรงดันไอน้ำ Express COMPACT SV7120",
	images: {
		image1: "../../public/tee1.png",
		image2: "../../public/tee2.png",
		image3: "../../public/tee3.png",
		image4: "../../public/tee4.png",
		image5: "../../public/tee5.png",
	},
	postBy: "Teeboy",
	postDate: new Date().toISOString(),
	price: 2634.5691,
	condition: "Second hand",
	description:
		"Product details of Tefal เตารีดแรงดันไอน้ำ Express COMPACT รุ่น SV7120 6 บาร์ กำลังไฟ 2380-2830 วัตต์ ความจุ 1.7 ลิตร\n\n- รีดเรียบเร็ว ด้วยแรงดันไอน้ำ 6 บาร์\n- พลังไอน้ำต่อเนื่อง 120 กรัม/นาที พลังไอน้ำเพิ่มพิเศษ 350 กรัม/นาที\n- แผ่นหน้าเตารีด Xpress Glide\n- ความจุแทงค์น้ำ 1.7 ลิตร สามารถรีดผ้าแนวตั้งได้\n- Manual setting ปรับอุณหภูมิ และไอน้ำได้ตามต้องการ\n- มีระบบ Eco mode ช่วยประหยัดพลังงาน\n- ช้อนดักตะกรัน Calc collector ช่วยขจัดตะกรันได้อย่างง่ายดายหมดจด\n- ส่งฟรี\n- ประกัน 2 ปี",
}

export default function ProductDetail() {
	// const { id } = useParams()
	const [image, setImage] = useState(product.images.image1)
	const imageArray = Object.values(product.images)
	if (!product) {
		return <p>Product not found</p>
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-20 flex">
			<div className="w-2/5 flex flex-col justify-start mt-5">
				<div className="w-2/5 h-96 w-96 flex items-center justify-center">
					<img alt={image} width="450" height="450" src={image} />
				</div>
				<div>
					{imageArray.map((img, index) => (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							type="button"
							onClick={() => setImage(img)}
							style={{
								margin: "5px",
								padding: "10px",
								background: image === img ? "#ddd" : "#fff",
								border: "1px solid #ccc",
							}}
						>
							<img alt={img} width="82" height="82" src={img} />
						</button>
					))}
				</div>
			</div>
			<div className="w-3/5 h-screen mt-6 ml-5">
				<div className="flex justify-between">
					<h1 className="font-bold text-3xl">{product.title}</h1>
					<FavoriteBorderIcon fontSize="large" />
				</div>
				<div className="mt-2 ml-5">
					<p className="text-3xl">฿ {formatNumber(product.price)}</p>
				</div>
				<div className="flex gap-5 mt-2 ml-7">
					<p className="opacity-50 ">
						By <span className="underline underline-offset-1">{product.postBy}</span>
					</p>
					<p className="opacity-50">Post Date {new Date(product.postDate).toLocaleDateString()}</p>
				</div>
				<div className="flex">
					<h1 className="font-bold text-2xl mr-5">Category</h1>
					<p className="flex items-end">{product.condition}</p>
				</div>
				<div className="flex flex-col mt-2">
					<h1 className="font-bold text-2xl font-MF">Product description</h1>
					<p className="mt-2 whitespace-pre-wrap text-xl">
						{
							"Product details of Tefal เตารีดแรงดันไอน้ำ Express COMPACT รุ่น SV7120 6 บาร์ กำลังไฟ 2380-2830 วัตต์ ความจุ 1.7 ลิตร\n- รีดเรียบเร็ว ด้วยแรงดันไอน้ำ 6 บาร์\n- พลังไอน้ำต่อเนื่อง 120 กรัม/นาที พลังไอน้ำเพิ่มพิเศษ 350 กรัม/นาที\n- แผ่นหน้าเตารีด Xpress Glide\n- ความจุแทงค์น้ำ 1.7 ลิตร สามารถรีดผ้าแนวตั้งได้\n- Manual setting ปรับอุณหภูมิ และไอน้ำได้ตามต้องการ\n- มีระบบ Eco mode ช่วยประหยัดพลังงาน\n- ช้อนดักตะกรัน Calc collector ช่วยขจัดตะกรันได้อย่างง่ายดายหมดจด\n- ส่งฟรี\n- ประกัน 2 ปี"
						}
					</p>
				</div>
				<Button
					style={{
						backgroundColor: "#4CAF50",
						color: "white",
						padding: "10px 20px",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
						marginTop: "10px",
					}}
				>
					Buy Product <ShoppingCartCheckoutIcon />
				</Button>
			</div>
		</div>
	)
}
