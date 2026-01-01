import { useState } from "react";
import BlogCard from "./BlogCard";

function BlogList({ blogs, alignStart = false, onReadMore }) {
  const [visibleCount, setVisibleCount] = useState(6);
  
  const visibleBlogs = blogs.slice(0, visibleCount);
  const hasMore = blogs.length > visibleCount;
  const showingMore = visibleCount > 6;
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };
  
  const handleShowLess = () => {
    setVisibleCount(6);
  };
  
  return (
    <>
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 pt-8 sm:pt-10 px-4 sm:px-0">Blogs</h2>
    <div className={`blog-list flex flex-wrap px-4 sm:px-0 ${alignStart ? "justify-start" : "justify-center sm:justify-around"} gap-4 sm:gap-6`}>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        visibleBlogs.map(blog => <BlogCard key={blog.id} blog={blog} onReadMore={onReadMore} />)
      )}
    </div>
    
    {(hasMore || showingMore) && (
      <div className="flex justify-center gap-4 mt-8 mb-12">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Load More Blogs
          </button>
        )}
        {showingMore && (
          <button
            onClick={handleShowLess}
            className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
          >
            Show Less
          </button>
        )}
      </div>
    )}
    </>
  );
}

export default BlogList;
