import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import './App.css'
import Home from './routes/Home'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './slices/userSlice';
import LandingPage from './routes/LandingPage';

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.user.data);
  useEffect(() => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    console.log(URL);
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${URL}/getDetails`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        if (response.ok) {
          console.log("User data fetched successfully:", data.data);
          dispatch(setUser(data.data))
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      }
    };

    fetchUserData();
  }, [dispatch])
    
  console.log("Userdata from App", userData)

  return (
    <Router>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>

      <Route path='/home' element={<Home/>}/>
    </Routes>
    </Router>
  )
}

export default App
