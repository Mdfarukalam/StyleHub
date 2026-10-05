import React from 'react'
 import Navbar  from '../component/navbar'
 import Top_product from './Top_product'
import Star_product from './Star_product'
import Footer from '../component/Footer'
import New_Arrivals from './New_Arrivals'
const Home = () => {
  return (
    <>
      <Navbar />

      <div className="pt-24"></div>
            <Star_product/>
      <Top_product/>
      <New_Arrivals/>
      
 <Footer/>
    </>
  )
}

export default Home