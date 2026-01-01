import React, { useState } from 'react';

const LoginSignupModal = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateLoginForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignupForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = isLogin ? validateLoginForm() : validateSignupForm();
    
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        const userData = isLogin 
          ? { 
              email: formData.email, 
              fullName: formData.email.split('@')[0] 
            }
          : { 
              email: formData.email, 
              fullName: formData.fullName 
            };

        // Call the onLogin callback
        if (onLogin && typeof onLogin === 'function') {
          onLogin(userData);
        }
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: ''
        });
        
        setIsLoading(false);
        onClose();
        
      } catch (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        alert('An error occurred. Please try again.');
      }
    }, 1500);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md shadow-lg border-2 border-black">
        
        {/* Header */}
        <div className="px-6 py-6 border-b-2 border-black flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">
            {isLogin ? 'Log In' : 'Sign Up'}
          </h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-gray-600 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          
          {/* Full Name (Signup only) */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-bold text-black mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-3 py-2 border-2 focus:outline-none transition ${
                  errors.fullName ? 'border-red-500' : 'border-black focus:border-black'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border-2 focus:outline-none transition ${
                errors.email ? 'border-red-500' : 'border-black focus:border-black'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border-2 focus:outline-none transition ${
                errors.password ? 'border-red-500' : 'border-black focus:border-black'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div className="mb-5">
              <label className="block text-sm font-bold text-black mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full px-3 py-2 border-2 focus:outline-none transition ${
                  errors.confirmPassword ? 'border-red-500' : 'border-black focus:border-black'
                }`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-green-600 text-white font-bold hover:bg-green-700 transition mb-4 disabled:opacity-50 border-2 border-green-600"
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
          </button>

          {/* Toggle Link */}
          <div className="text-center border-t-2 border-black pt-4">
            <p className="text-sm text-black">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-black font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupModal;
