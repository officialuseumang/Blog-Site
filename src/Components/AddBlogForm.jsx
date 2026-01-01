import React, { useState } from 'react';

const AddBlogForm = ({ onClose, onBlogAdded, user, blogs = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    content: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Tech", "Mindset", "Career", "Sports", "Other"];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create new blog object
      const newBlog = {
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        author: user.fullName,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        image: formData.image,
        content: formData.content
      };

      // In a real app, you'd send this to a server
      // For now, we'll just trigger the callback
      onBlogAdded(newBlog);

      // Reset form
      setFormData({
        title: '',
        category: '',
        description: '',
        image: '',
        content: ''
      });

      onClose();
    } catch (error) {
      console.error('Error adding blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Add New Blog</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-6 py-6 overflow-y-auto flex-1">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
                errors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
                errors.category ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
                errors.image ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter blog description (short summary)"
              rows="3"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition resize-none ${
                errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter full blog content (you can use \n for line breaks)"
              rows="6"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition resize-none ${
                errors.content ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'
              }`}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex gap-3 shrink-0 sticky bottom-0">
          <button 
            onClick={onClose}
            className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Blog'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
