import * as React from "react"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Post from "@/components/Post"
import SellIcon from "@mui/icons-material/Sell"
import SearchIcon from "@mui/icons-material/Search"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export default function MyPosts() {
	const [value, setValue] = React.useState(0) // 0 for 'For Sale', 1 for 'Looking to Buy'
	const [filters, setFilters] = React.useState({
		ongoing: true,
		closed: false,
	})

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleFilterToggle = (status) => {
		// Toggles selected filter state
		setFilters((prev) => {
			const newFilters = { ...prev, [status]: !prev[status] }

			// Check if both are unchecked, if so, prevent the toggle to ensure one is always selected
			if (!newFilters.ongoing && !newFilters.closed) {
				return prev // Revert to previous state if both are unchecked
			}
			return newFilters
		})
	}

	return (
		<>
			<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab
						icon={<SellIcon />}
						iconPosition="start"
						label="For Sale"
						sx={{
							minHeight: 50,
						}}
					/>
					<Tab
						icon={<SearchIcon />}
						iconPosition="start"
						label="Looking to Buy"
						sx={{
							minHeight: 50,
						}}
					/>
				</Tabs>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
				<ToggleButtonGroup aria-label="post status filter">
					<ToggleButton
						value="ongoing"
						selected={filters.ongoing}
						onClick={() => handleFilterToggle("ongoing")}
						aria-label="ongoing"
					>
						Ongoing
					</ToggleButton>
					<ToggleButton
						value="closed"
						selected={filters.closed}
						onClick={() => handleFilterToggle("closed")}
						aria-label="closed"
					>
						Closed
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			{/* Pass the selected tab and filters to the Post component */}
			<Post category={value === 0 ? "forSale" : "lookingToBuy"} filters={filters} />
		</>
	)
}
