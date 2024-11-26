import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Translate from "@/components/Translate";

export default function CheckOut() {
	return (
		<Container
			sx={{
				mt: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				bgcolor: "#ffff1f",
			}}
			maxWidth="md" // Restricts the width to a medium size
		>
			<Box sx={{ width: "100%" }}>
				<Typography variant="h3" sx={{ display: "flex", alignItems: "center" }}>
					<LocationOnOutlinedIcon sx={{ mr: 1 }} />
					<Translate text="DeliveryInformation" />
				</Typography>
			</Box>
            <Box sx={{ width: "100%" }}>
				<Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
					<Translate text="Address" />
				</Typography>
			</Box>
		</Container>
	);
}