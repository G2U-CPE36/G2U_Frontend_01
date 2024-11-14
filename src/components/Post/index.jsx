import React from "react"

export default function Post({ category, filters }) {
	// Example data structure for posts; in a real application, this might come from props or an API
	const allPosts = [
		{ id: 1, category: "forSale", status: "ongoing", content: "For Sale: Item 1 Ongoing" },
		{ id: 2, category: "forSale", status: "closed", content: "For Sale: Item 2 Closed" },
		{ id: 3, category: "lookingToBuy", status: "ongoing", content: "Looking to Buy: Item 1 Ongoing" },
		{ id: 4, category: "lookingToBuy", status: "closed", content: "Looking to Buy: Item 2 Closed" },
	]

	// Filter posts based on the selected category and status
	const filteredPosts = allPosts.filter((post) => {
		return (
			post.category === category && // Matches selected tab category
			((filters.ongoing && post.status === "ongoing") || // Show ongoing if selected
				(filters.closed && post.status === "closed")) // Show closed if selected
		)
	})

	return (
		<div>
			{filteredPosts.length > 0 ? (
				filteredPosts.map((post) => (
					<div key={post.id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
						{post.content}
					</div>
				))
			) : (
				<p>No posts available for the selected filters.</p>
			)}
		</div>
	)
}
