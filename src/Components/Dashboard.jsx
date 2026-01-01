import React, { useState } from 'react';
import blogs from "../data/blogs.json";
import AddBlogForm from "./AddBlogForm";

const Dashboard = ({ user, onLogout }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [userBlogs, setUserBlogs] = useState(
    blogs.filter(blog => blog.author === user.fullName)
  );

  const handleBlogAdded = (newBlog) => {
    setUserBlogs(prev => [newBlog, ...prev]);
    setShowAddForm(false);
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setUserBlogs(prev => prev.filter(blog => blog.id !== blogId));
      const index = blogs.findIndex(b => b.id === blogId);
      if (index > -1) {
        blogs.splice(index, 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <div className="bg-white border-b-2 border-black sticky top-0 z-40">
        <div className="px-4 md:px-[5%] lg:px-[10%] py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-600 text-sm md:text-base">Welcome, {user.fullName}!</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 md:px-6 py-2 rounded-2xl hover:bg-red-700 transition font-semibold text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-[5%] lg:px-[10%] py-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Manage Your Blogs
          </h2>
          <p className="text-gray-600 mb-4">
            Create, edit, and manage all your blog posts from one place.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition font-semibold inline-block"
          >
            + Create New Blog
          </button>
        </div>

        {/* Blogs Grid */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Your Blogs ({userBlogs.length})
          </h3>
          
          {userBlogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-6">
                Start sharing your thoughts by creating your first blog post!
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition font-semibold"
              >
                Create Your First Blog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map(blog => (
                <div key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  {/* Image */}
                  {blog.image && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {blog.description}
                    </p>
                    
                    <p className="text-xs text-gray-500 mb-4">
                      {blog.date}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Blog Form Modal */}
      {showAddForm && (
        <AddBlogForm 
          onClose={() => setShowAddForm(false)} 
          onBlogAdded={handleBlogAdded}
          blogs={blogs}
        />
      )}
    </div>
  );
};

export default Dashboard;
