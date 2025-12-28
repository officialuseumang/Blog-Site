

function CategoryFilter({ categories, setSelectedCategory }) {
  return (
    <div className="pt-2 flex justify-between">
    <div className="searchbar flex gap-0 items-center">
        <input className="searchbar border-2 border-black p-2 rounded-l-3xl h-10"  type="text" name="search" id="search" placeholder='Search...' />
        <button className="bg-black text-white px-6 py-2 rounded-r-3xl hover:bg-gray-800 transition font-semibold h-10">Search</button>
    </div>
    <div className="filters">
      {categories.map((cat, index) => (
        <button key={index} onClick={() => setSelectedCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
    </div>
  );
}

export default CategoryFilter;