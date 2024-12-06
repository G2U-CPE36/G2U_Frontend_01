import React from "react";
import Box from "@mui/material/Box";

export default function ProductCard({ product, layoutType = "default" }) {
    const handleImageError = (e) => {
        e.target.src = "/fallback-image.jpg"; // Fallback image
    };

    // Updated bufferToBase64 function
    const bufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    // Extract and convert the first image
    const imageSrc =
        product.productImage && product.productImage[0]
            ? bufferToBase64(product.productImage[0].data)
            : "/fallback-image.jpg";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                padding: 2,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "2px 6px 8px rgba(0, 0, 0, 0.3)",
                height: "100%",
                width: "100%",
            }}
        >
            {/* Product Image */}
            <Box
                sx={{
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#c0c0c0",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <img
                    src={imageSrc}
                    alt={product.productName || "Product"}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    onError={handleImageError}
                />
            </Box>

            {/* Product Info */}
            <Box sx={{ marginTop: "8px", textAlign: "left" }}>
                <h2 style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    {product.productName || "Unknown Product"}
                </h2>
                <p style={{ color: "#757575", fontSize: "0.9rem" }}>
                    {product.province || "Unknown Location"}
                </p>
                <Box sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
                    ฿ {product.price || "N/A"}
                </Box>
            </Box>
        </Box>
    );
}
