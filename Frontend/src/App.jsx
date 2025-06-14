import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Home from './routes/Home'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.user.data);
  useEffect(() => {
    const URL = "http://localhost:3000/user/getDetails";
    const fetchUserData = async () => {
      try {
        const response = await fetch(URL, {
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
      <Home/>
    </Router>
  )
}

export default App
