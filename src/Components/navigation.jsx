import React from 'react'

const navigation = ({ searchQuery, setSearchQuery, onAddBlog, onOpenLogin, user, onGoToAdmin }) => {
  return (
    <nav className="navbar w-full h-auto md:h-20 border-b-2 border-black px-4 md:px-[5%] lg:px-[10%] py-4 md:py-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 h-full">
        
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-black">BlogHub</h1>
        </div>

        {/* Search Bar and Button */}
        <div className="flex-1 flex items-center gap-2 w-full md:w-auto md:max-w-md lg:max-w-lg">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-black transition text-sm md:text-base"
          />
          <button className='bg-black text-white px-4 md:px-6 py-2 font-bold rounded-2xl hover:bg-gray-800 cursor-pointer transition text-xs md:text-sm whitespace-nowrap'>
            Search
          </button>
        </div>

        {/* Login Button or User Icon */}
        {!user ? (
          <button 
            onClick={onOpenLogin}
            className='bg-green-600 px-6 py-2 md:py-2.5 text-white font-bold text-sm md:text-base border-0 rounded-2xl hover:bg-green-700 cursor-pointer transition whitespace-nowrap'
          >
            Log In / Sign Up
          </button>
        ) : (
          <button
            onClick={onAddBlog}
            className='bg-green-600 px-6 py-2 md:py-2.5 text-white font-bold text-sm md:text-base border-0 rounded-2xl hover:bg-green-700 cursor-pointer transition whitespace-nowrap'
            title="Add a new blog"
          >
            + Add Blog
          </button>
        )}
      </div>
    </nav>
  )
}

export default navigation