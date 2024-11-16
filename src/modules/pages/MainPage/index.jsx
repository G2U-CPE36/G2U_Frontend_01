import Translate from "@/components/Translate";
import SearchIcon from '@mui/icons-material/Search';

export default function MainPage() {
  return (
    <div className="p-5 w-full max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-yellow-400 p-3 w-full box-border">
        <h1 className="text-xl text-gray-800 pl-2">Header</h1>
        <button 
          type="button" 
          className="bg-gray-800 text-white px-4 py-2 cursor-pointer"
        >
          Login
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-8 my-5 items-center w-full box-border">
        <button 
          type="button" 
          className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          <Translate text="Categories" />
        </button>
        <button 
          type="button" 
          className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          <Translate text="Price Range" />
        </button>
        <button 
          type="button" 
          className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          <Translate text="Province" />
        </button>

        {/* Enhanced Search Field */}
        <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-md">
          <SearchIcon className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow outline-none px-2"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-4 gap-5 mt-5">
        {products.map((product) => (
          <div 
            className="bg-gray-300 h-36 flex items-center justify-center text-gray-800 text-lg rounded" 
            key={product.id}
          >
            {product.name}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-5">
        <button type="button" className="cursor-pointer text-gray-800 text-lg">1</button>
        <button type="button" className="cursor-pointer text-gray-800 text-lg">2</button>
        <button type="button" className="cursor-pointer text-gray-800 text-lg">3</button>
      </div>
    </div>
  );
}
