

function CategoryFilter({ categories, setSelectedCategory, searchQuery, setSearchQuery }) {
  const handleSearch = () => {
    // Search is triggered when button is clicked or Enter is pressed
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="pt-2 px-4 sm:px-0 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
    
    <div className="filters w-full sm:w-auto">
      <select 
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full sm:w-auto border-2 border-gray-300 p-3 rounded-lg cursor-pointer font-semibold bg-white text-gray-800 hover:border-black transition shadow-md focus:outline-none focus:border-black text-sm sm:text-base"
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
}

export default CategoryFilter;