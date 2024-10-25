import React from 'react'
import MessageForm from '../components/MessageForm'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Hero title={"Welcome to Lavish Medical Institute | Your trusted health care provider"} imageUrl = {"/hero.png"}/>
      <Biography imageUrl={"/about.png"}/>
      <Departments/>
      <MessageForm/>
      {/* <Footer/> */}
      {/* <Navbar/> */}
    </>
  )
}

export default Home
