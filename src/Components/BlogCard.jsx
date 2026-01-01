function BlogCard({ blog, onReadMore }) {
  return (
    <div className="w-full sm:w-72 bg-white rounded-3xl shadow-lg flex flex-col overflow-hidden">

      {/* Image */}
      {blog.image && (
        <div className="w-full h-40 sm:h-48 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex-[1.5] px-3 sm:px-4 pt-3 sm:pt-4 font-semibold text-base sm:text-lg flex items-center gap-2 flex-wrap">
        {blog.title}
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full ml-auto">
          {blog.category}
        </span>
      </div>

      <div className="flex-[4.5] px-3 sm:px-4 text-xs sm:text-sm text-gray-600 overflow-hidden">
        <p className="line-clamp-4">
          {blog.description}
        </p>
      </div>

      <div className="flex-[2.5] px-3 sm:px-4 pb-3 sm:pb-4 flex items-end">
        <button 
          onClick={() => onReadMore(blog)}
          className="w-full py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition text-sm sm:text-base"
        >
          Read More
        </button>
      </div>

    </div>
  );
};


export default BlogCard;