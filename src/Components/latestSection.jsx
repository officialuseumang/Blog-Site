function LatestSection({ onReadMore, blogs = [] }) {
  const latestBlogs = blogs.sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="latest-section mt-12 mb-12">
      <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Large Featured Blog */}
        <div className="lg:row-span-2 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition relative">
          <div className="h-80 lg:h-full relative group">
            {/* Full Blurred Background Image */}
            {latestBlogs[0].image && (
              <img 
                src={latestBlogs[0].image} 
                alt={latestBlogs[0].title}
                className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
              />
            )}
            <div className="absolute inset-0 bg-opacity-70 group-hover:bg-opacity-80 transition"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
              <h3 className="text-3xl font-bold mb-3">{latestBlogs[0].title}</h3>
              <p className="text-lg mb-4 line-clamp-3">{latestBlogs[0].description}</p>
              <div className="flex items-center justify-between">
                <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                  {latestBlogs[0].category}
                </span>
                <button 
                  onClick={() => onReadMore(latestBlogs[0])}
                  className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Blog Cards */}
        {latestBlogs.slice(1, 3).map((blog, index) => (
          <div 
            key={index}
            className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition h-48 relative"
          >
            <div className="h-full relative group">
              {/* Full Blurred Background Image */}
              {blog.image && (
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
                />
              )}
              <div className="absolute inset-0  bg-opacity-75 group-hover:bg-opacity-85 transition"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-sm mb-3 line-clamp-2">{blog.description}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                    {blog.category}
                  </span>
                  <button 
                    onClick={() => onReadMore(blog)}
                    className="text-white text-sm font-bold hover:underline"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestSection;
