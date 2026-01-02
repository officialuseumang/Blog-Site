function BlogCard({ blog, onReadMore }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg flex flex-col overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">

      {/* Image */}
      {blog.image && (
        <div className="w-full aspect-video overflow-hidden relative">
          <span className="text-xs bg-blue-100 text-blue-600 rounded-full absolute px-2 py-1 mt-2 ml-2 z-10">
            {blog.category}
          </span>
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="px-4 pt-4 font-semibold text-base sm:text-lg flex items-center gap-2 flex-wrap line-clamp-2">
        {blog.title}
      </div>

      <div className="px-4 text-sm text-gray-600 overflow-hidden">
        <p className="line-clamp-3">
          {blog.description}
        </p>
      </div>

      <div className="px-4 pb-4 flex items-end">
        <button 
          onClick={() => onReadMore(blog)}
          className="w-full mt-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition text-sm font-medium"
        >
          Read More
        </button>
      </div>

    </div>
  );
};


export default BlogCard;