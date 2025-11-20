import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();

  const logout=async ()=>{
    try {
      const logres=await axios.post("http://localhost:8000/logout",{},{withCredentials:true});
      console.log(logres)
      if(logres.data.status===true){
        console.log("Logout successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error,"error in logout")
      
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
        
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl tracking-wide">
          MyBlog
        </Link>

        {/* Search (Desktop) */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 
                       text-gray-800 dark:text-white bg-white dark:bg-gray-900"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="hover:text-yellow-300">Home</Link>
          <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <button
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm"
            onClick={logout}
          >
            Logout
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm"
          >
            {dark ? "Light 🌞" : "Dark 🌙"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-3 bg-blue-600 dark:bg-gray-900">
          {/* Search (Mobile) */}
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 
                       text-gray-800 dark:text-white bg-white dark:bg-gray-900"
          />

          <Link to="/home" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
            Home
          </Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
            Profile
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
            About
          </Link>
          <button
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm"
          >
          Logout
          </button>
          <button
            onClick={() => {
              setDark(!dark);
              setMenuOpen(false);
            }}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-sm"
          >
            {dark ? "Light 🌞" : "Dark 🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

