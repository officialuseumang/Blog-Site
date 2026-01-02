import { useEffect } from 'react';

function BlogModal({ blog, onClose }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xl flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">{blog.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {/* Image */}
          {blog.image && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="mb-4">
            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {blog.category}
            </span>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {blog.description}
            </p>

            {blog.content && (
              <>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Full Content</h3>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </div>
              </>
            )}

            {blog.author && (
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-500">Author: <span className="font-semibold text-gray-700">{blog.author}</span></p>
              </div>
            )}

            {blog.date && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Published: <span className="text-gray-700">{blog.date}</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default BlogModal;
