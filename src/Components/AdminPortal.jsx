import React, { useState, useMemo } from 'react';
import AddBlogForm from "./AddBlogForm";

const AdminPortal = ({ user, onLogout, blogs, onBlogAdded, onDeleteBlog }) => {
  const [activeTab, setActiveTab] = useState('blogs'); // 'profile', 'blogs', 'addBlog'
  const [showAddForm, setShowAddForm] = useState(false);
  
  const userBlogs = useMemo(() => 
    blogs.filter(blog => blog.author === user.fullName),
    [blogs, user.fullName]
  );
  const [editingUser, setEditingUser] = useState(user);
  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    email: user.email
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleBlogAdded = (newBlog) => {
    onBlogAdded(newBlog);
    setShowAddForm(false);
    setActiveTab('blogs');
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      onDeleteBlog(blogId);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setEditingUser(profileData);
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="md:w-64 bg-gray-50 border-r border-gray-200 p-6">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Admin</h2>
          <p className="text-sm text-gray-600 mt-1">{editingUser.fullName}</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 mb-10">
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              activeTab === 'profile'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              activeTab === 'blogs'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Blogs
          </button>
          <button
            onClick={() => setActiveTab('addBlog')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              activeTab === 'addBlog'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Add Blog
          </button>
        </nav>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 transition font-medium"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
            
            <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
              
              {!isEditingProfile ? (
                <>
                  <div className="space-y-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="text-lg font-semibold text-gray-800">{editingUser.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">{editingUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Blogs Published</p>
                      <p className="text-lg font-semibold text-blue-600">{userBlogs.length}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileData({
                          fullName: editingUser.fullName,
                          email: editingUser.email
                        });
                      }}
                      className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* My Blogs Tab */}
        {activeTab === 'blogs' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Blogs ({userBlogs.length})</h1>
            
            {userBlogs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-2xl">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No blogs yet</h3>
                <p className="text-gray-600 mb-6">Start sharing your thoughts by creating your first blog post!</p>
                <button
                  onClick={() => setActiveTab('addBlog')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition font-semibold inline-block"
                >
                  Create Your First Blog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBlogs.map(blog => (
                  <div key={blog.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition">
                    {blog.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
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
                        📅 {blog.date}
                      </p>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Blog Tab */}
        {activeTab === 'addBlog' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog</h1>
            
            <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Blog Details</h2>
              <AddBlogForm 
                onClose={() => setActiveTab('blogs')} 
                onBlogAdded={handleBlogAdded}
                user={user}
                blogs={blogs}
                isFullPage={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
