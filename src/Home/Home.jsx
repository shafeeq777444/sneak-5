import React from 'react'
import NavBar from './NavBar'
import ResponsiveCarousel from './ResponsiveCarousel'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <NavBar/>
     
      <Outlet/>
    </div>
  )
}

export default Home
