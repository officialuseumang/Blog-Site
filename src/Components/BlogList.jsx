import BlogCard from "./BlogCard";

function BlogList({ blogs }) {
  return (
    <div className="blog-list flex flex-wrap justify-around gap-6">
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
      )}
    </div>
  );
}

export default BlogList;
