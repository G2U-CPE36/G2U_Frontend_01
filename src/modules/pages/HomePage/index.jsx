import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";

export default function MainPage() {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [province, setProvince] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const clearFilters = () => {
    setCategory("");
    setPriceRange("");
    setProvince("");
    setSearchQuery("");
  };

  // Dummy product data with properties for filtering
  const products = [
    { id: 1, name: "Smartphone", category: "electronics", priceRange: "100-200", province: "bangkok" },
    { id: 2, name: "Laptop", category: "electronics", priceRange: "200+", province: "chiangmai" },
    { id: 3, name: "T-shirt", category: "clothing", priceRange: "0-50", province: "bangkok" },
    { id: 4, name: "Novel", category: "books", priceRange: "0-50", province: "phuket" },
    { id: 5, name: "Dining Table", category: "furniture", priceRange: "100-200", province: "khonkaen" },
    { id: 6, name: "Headphones", category: "electronics", priceRange: "50-100", province: "bangkok" },
    { id: 7, name: "Shoes", category: "clothing", priceRange: "50-100", province: "chiangmai" },
    { id: 8, name: "Backpack", category: "clothing", priceRange: "0-50", province: "phuket" },
  ];

  // Filter products based on dropdown selections and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesPriceRange = priceRange ? product.priceRange === priceRange : true;
    const matchesProvince = province ? product.province === province : true;
    const matchesSearchQuery = searchQuery ? product.name.toLowerCase().includes(searchQuery) : true;
    return matchesCategory && matchesPriceRange && matchesProvince && matchesSearchQuery;
  });

  return (
    <div className="p-5 w-full max-w-full">
      {/* Search Bar and Filters */}
      <div className="flex gap-8 my-5 items-center w-full box-border">
        {/* Category Dropdown */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Categories</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Categories"
              onChange={handleCategoryChange}
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Price Range Dropdown */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="price-select-label">Price Range</InputLabel>
            <Select
              labelId="price-select-label"
              id="price-select"
              value={priceRange}
              label="Price Range"
              onChange={handlePriceRangeChange}
            >
              <MenuItem value="0-50">$0-$50</MenuItem>
              <MenuItem value="50-100">$50-$100</MenuItem>
              <MenuItem value="100-200">$100-$200</MenuItem>
              <MenuItem value="200+">$200+</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Province Dropdown */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="province-select-label">Province</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-select"
              value={province}
              label="Province"
              onChange={handleProvinceChange}
            >
              <MenuItem value="bangkok">Bangkok</MenuItem>
              <MenuItem value="chiangmai">Chiang Mai</MenuItem>
              <MenuItem value="phuket">Phuket</MenuItem>
              <MenuItem value="khonkaen">Khon Kaen</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Clear Filters Button */}
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

        {/* Search Bar (on the same line) */}
        <div className="flex items-center border border-gray-300 rounded px-2 py-1 ml-4 w-full max-w-md">
          <SearchIcon className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow outline-none px-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-4 gap-5 mt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="bg-gray-300 h-36 flex items-center justify-center text-gray-800 text-lg rounded"
              key={product.id}
            >
              {product.name}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-4">No products found.</p>
        )}
      </div>
    </div>
  );
}
