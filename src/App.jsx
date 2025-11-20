import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from './component/auth/Signin'
import Signup from './component/auth/Signup'
import Routecomp from './component/route/Routecomp'
import Home from './component/Pages/Home'
import BlogDetail from './component/Pages/BlogDetail'
import Profile from './component/Pages/Profile'
import About from './component/Pages/About'
import './App.css'

function App() {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        {/* All routes with Navbar */}
        <Route element={<Routecomp />}>
          <Route path='/home' element={<Home />} />
          <Route path='/blog/:id' element={<BlogDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about/:id' element={<About/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
