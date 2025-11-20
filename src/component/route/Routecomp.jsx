import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

function Routecomp() {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Navbar hamesha upar rahega */}
      <Navbar />

      {/* Ye jagah par child routes render honge */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default Routecomp
