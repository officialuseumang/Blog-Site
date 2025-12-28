function BlogCard({ blog }) {
  return (
    <div className="w-72 h-90  bg-white rounded-3xl shadow-lg flex flex-col overflow-hidden">

      <div className="flex-[1.5] px-4 pt-4 font-semibold text-lg">
        {blog.title}
      </div>

      <div className="flex-[4.5] px-4 text-sm text-gray-600 overflow-hidden">
        {blog.description}
      </div>

      <div className="flex-[1.5] px-4 flex items-center">
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {blog.category}
        </span>
      </div>

      <div className="flex-[2.5] px-4 pb-4 flex items-end">
        <button className="w-full py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition">
          Read More
        </button>
      </div>

    </div>
  );
};


export default BlogCard;