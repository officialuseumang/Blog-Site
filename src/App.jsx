import { useState } from "react";
import blogs from "./data/blogs.json";
import BlogList from "./Components/BlogList";
import CategoryFilter from "./Components/CategoryFilter";
import Navigation from "./Components/navigation";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div>
     
      
      <div className="container">
      <CategoryFilter
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        />

      <BlogList className='flex-wrap' blogs={filteredBlogs} />
      </div>

    </div>
  );
}

export default App;
