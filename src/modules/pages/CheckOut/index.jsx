import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import Translate from "@/components/Translate"
import { useNavigate } from "react-router-dom"

const mockproduct = {
	id: 1,
	title: "Tefal เตารีดแรงดันไอน้ำ Express COMPACT SV7120",
	images: "/tee1.png",
	postBy: "Teeboy",
	price: 2634.5691,
	condition: "Second-hand", //tag
	description: `
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

const mockdata = {
	address:
		"โคนัน เอโดงาวะ (+66) 99 999 9999 99/99, ซอย สุขสวัสดิ์99, ลัดหลวง, ตำบลบางพึ่ง, อำเภอพระประแดง, จังหวัดสมุทรปราการ, 10130",
	shippingfee: "0",
}

export default function CheckOut() {
	const navigate = useNavigate()
   
	return (
	 <Container
	  sx={{
	   mt: 2,
	   display: "flex",
	   flexDirection: "column",
	   justifyContent: "center",
	   width: "720px",
	  }}
	 >
	  {/* Header */}
	  <Typography variant="h3" sx={{ display: "flex", alignItems: "center" }}>
	   <LocationOnOutlinedIcon sx={{ mr: 1, fontSize: "inherit" }} />
	   <Translate text="DeliveryInformation" />
	  </Typography>
   
	  {/* Address Section */}
	  <Box>
	   <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
		<Typography variant="h6" sx={{ mr: 2 }}>
		 <Translate text="Address" />
		</Typography>
	   </Box>
	   <Typography
		variant="body1"
		color="textSecondary"
		sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
	   >
		{mockdata.address.substring(0, 70)}...
	   </Typography>
	  </Box>
   
	  {/* Product Card */}
	  <Box>
	   <Card
		sx={{
		 display: "flex",
		 mt: 4,
		 mb: 3,
		 cursor: "pointer",
		}}
		onClick={() => navigate(`/product/${mockproduct.id}`)}
	   >
		<CardMedia
		 component="img"
		 sx={{
		  width: 200,
		  height: 200,
		  objectFit: "cover",
		 }}
		 image={mockproduct.images}
		 alt={mockproduct.title}
		/>
		<CardContent sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
		 <Box>
		  <Typography variant="body2" color="textSecondary">
		  <Translate text="By" /> {mockproduct.postBy}
		  </Typography>
		  <Typography variant="h5">{mockproduct.title}</Typography>
		  <Typography variant="body1"><Translate text="ProductDetails" /></Typography>
		  <Typography variant="body1" color="textSecondary">
		   {mockproduct.description.substring(0, 100)}...
		  </Typography>
		 </Box>
   
		 <Typography variant="h5" sx={{ ml: 2, mt: 3, textAlign: "right", whiteSpace: "nowrap" }}>
		  ฿ {mockproduct.price.toFixed(2)}
		 </Typography>
		</CardContent>
	   </Card>
	  </Box>
   
	  {/* Shipping Options */}
	  <Box sx={{ mt: 2 }}>
	   <Typography variant="h5"><Translate text="ShippingOptions" /></Typography>
	   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
		<LocalShippingOutlinedIcon sx={{ mr: 1 }} />
		<Typography variant="body1"><Translate text="InternationalExpress" /></Typography>
	   </Box>
	  </Box>
   
	  {/* Payment Methods */}
	  <Box sx={{ mt: 2 }}>
	   <Typography variant="h5"><Translate text="PaymentMethods" /></Typography>
	   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
		<Box sx={{ display: "flex", alignItems: "center" }}>
		 <CreditCardOutlinedIcon sx={{ mr: 1 }} />
		 <Typography variant="body1"><Translate text="CreditCard" /></Typography>
		</Box>
	   </Box>
	  </Box>
   
	  {/* Payment Details */}
	  <Box sx={{ mt: 2 }}>
	   <Typography variant="h5"><Translate text="OrderTotal" /></Typography>
	   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
		<Typography variant="body1"><Translate text="ShippingFee" /></Typography>
		<Typography variant="body1">฿ {mockdata.shippingfee}</Typography>
	   </Box>
	   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
		<Typography variant="body1"><Translate text="Total" /></Typography>
		<Typography variant="body1">฿ {mockproduct.price.toFixed(2)}</Typography>
	   </Box>
	  </Box>
   
	  {/* Place Order Button */}
	  <Box sx={{ textAlign: "center", mt: 2 }}>
	   <Button
		variant="contained"
		color="primary"
		size="large"
		fullWidth
		onClick={() => {
		 console.log("submit")
		}}
	   >
		<Translate text="PlaceOrder" />
	   </Button>
	  </Box>
	 </Container>
	)
   }