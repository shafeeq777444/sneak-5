import React from 'react'
import NavBar from './NavBar'
import ResponsiveCarousel from './ResponsiveCarousel'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


const Home = () => {
  return (
    <div>
      <NavBar/>
     
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
