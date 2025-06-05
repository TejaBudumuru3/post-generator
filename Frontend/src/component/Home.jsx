import React from 'react'
import NavBar from './Nav'
import InputField from './InputField.jsx'
const Home = () => {
  return (
    <>
        <NavBar user="teja"/>
        <div className="main-section">
            <InputField/>
        </div>
        
    </>
  )
}

export default Home