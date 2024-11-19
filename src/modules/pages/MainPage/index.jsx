import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import Translate from "@/components/Translate";

export default function MainPage() {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [province, setProvince] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceRangeChange = (event) => setPriceRange(event.target.value);
  const handleProvinceChange = (event) => setProvince(event.target.value);
  const handleSearchChange = (event) =>
    setSearchQuery(event.target.value.toLowerCase());

  const clearFilters = () => {
    setCategory("");
    setPriceRange("");
    setProvince("");
    setSearchQuery("");
  };

  const handleImageError = (e) => {
    e.target.src = "/pic/default.jpg"; // Set fallback image path
  };

  const products = [
    { id: 1, name: "Smartphone", category: "electronics", priceRange: "100-200", province: "Bangkok", condition: "New", image: "/pic/Smartphone.jpg" },
    { id: 2, name: "Laptop", category: "electronics", priceRange: "200+", province: "Chiangmai", condition: "Used - Good", image: "/pic/Laptop.jpg" },
    { id: 3, name: "T-shirt", category: "clothing", priceRange: "0-50", province: "Bangkok", condition: "New", image: "/pic/T-shirt.jpg" },
    { id: 4, name: "Novel", category: "books", priceRange: "0-50", province: "Phuket", condition: "Used - Like New", image: "/pic/Novel.jpg" },
    { id: 5, name: "Dining Table", category: "furniture", priceRange: "100-200", province: "Khonkaen", condition: "Used - Acceptable", image: "/pic/Dining Table.jpg" },
    { id: 6, name: "Headphones", category: "electronics", priceRange: "50-100", province: "Bangkok", condition: "Refurbished", image: "/pic/Headphones.jpg" },
    { id: 7, name: "Shoes", category: "clothing", priceRange: "50-100", province: "Chiangmai", condition: "New", image: "/pic/Shoes.jpg" },
    { id: 8, name: "Backpack", category: "clothing", priceRange: "0-50", province: "Phuket", condition: "Used - Good", image: "/pic/Backpack.jpg" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesPriceRange = priceRange ? product.priceRange === priceRange : true;
    const matchesProvince = province ? product.province === province : true;
    const matchesSearchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery)
      : true;
    return matchesCategory && matchesPriceRange && matchesProvince && matchesSearchQuery;
  });

  return (
    <div className="p-5 w-full max-w-full">
      <div className="flex gap-8 my-5 items-center w-full box-border">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">
              <Translate text="Categories" />
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Categories"
              onChange={handleCategoryChange}
            >
              <MenuItem value="electronics">
                <Translate text="Electronics" />
              </MenuItem>
              <MenuItem value="clothing">
                <Translate text="Clothing" />
              </MenuItem>
              <MenuItem value="books">
                <Translate text="Books" />
              </MenuItem>
              <MenuItem value="furniture">
                <Translate text="Furniture" />
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="price-select-label">
              <Translate text="Price Range" />
            </InputLabel>
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

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="province-select-label">
              <Translate text="Province" />
            </InputLabel>
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

        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={clearFilters}
        >
          <Translate text="Clear Filters" />
        </button>

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

      <div className="grid grid-cols-4 gap-5 mt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="bg-gray-300 p-4 flex flex-col justify-between text-gray-800 text-sm rounded"
              key={product.id}
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-2"
                  onError={handleImageError}
                />
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-gray-500">{product.province}</p>
                <p className="text-red-500">{product.condition}</p>
              </div>
              <div className="font-bold">${product.priceRange}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-4">
            <Translate text="No products found." />
          </p>
        )}
      </div>
    </div>
  );
}
