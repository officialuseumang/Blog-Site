import { useState, useEffect } from "react";
import initialBlogs from "./data/blogs.json";
import BlogList from "./Components/BlogList";
import CategoryFilter from "./Components/CategoryFilter";
import LatestSection from "./Components/latestSection";
import Navigation from "./Components/navigation";
import BlogModal from "./Components/BlogModal";
import AddBlogForm from "./Components/AddBlogForm";
import LoginSignupModal from "./Components/LoginSignupModal";
import AdminPortal from "./Components/AdminPortal";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  const filteredBlogs = (searchQuery.trim() ? 
    blogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : 
    (selectedCategory === "All"
      ? blogs
      : blogs.filter(blog => blog.category === selectedCategory))
  ).sort((a, b) => b.id - a.id);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const handleOpenAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleBlogAdded = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev]);
    setShowAddForm(false);
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(prev => prev.filter(blog => blog.id !== blogId));
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('blogUser', JSON.stringify(userData));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
    setShowAdminPortal(false);
  };

  const handleGoToAdmin = () => {
    setShowAdminPortal(true);
  };

  const handleBackToHome = () => {
    setShowAdminPortal(false);
  };

  // If user is logged in and viewing admin portal
  if (user && showAdminPortal) {
    return (
      <AdminPortal 
        user={user} 
        onLogout={handleBackToHome}
        blogs={blogs}
        onBlogAdded={handleBlogAdded}
        onDeleteBlog={handleDeleteBlog}
      />
    );
  }

  return (
    <div>
      <Navigation 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onAddBlog={user ? handleGoToAdmin : handleOpenLoginModal}
        onOpenLogin={handleOpenLoginModal}
        user={user}
        onGoToAdmin={handleGoToAdmin}
      />
      
      <div className="container">
        <CategoryFilter
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
          {selectedCategory === "All" && !searchQuery.trim() && <LatestSection onReadMore={handleReadMore} blogs={blogs} />}
        
        <BlogList 
          blogs={filteredBlogs} 
          alignStart={selectedCategory !== "All" || !!searchQuery.trim()} 
          onReadMore={handleReadMore}
        />
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={handleCloseModal} />
      )}

      {showAddForm && (
        <AddBlogForm onClose={handleCloseAddForm} onBlogAdded={handleBlogAdded} user={user} blogs={blogs} />
      )}

      {showLoginModal && (
        <LoginSignupModal 
          onClose={handleCloseLoginModal} 
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
