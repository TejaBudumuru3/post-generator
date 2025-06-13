import React ,{ useEffect,useState } from 'react';
import './App.css'
import Home from './routes/Home'

function App() {

  const [userData, setUserData] = React.useState({});
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
          setUserData(data.data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      }
    };

    fetchUserData();
    },[])
    
    console.log("Userdata from App",userData)

  return (
    <>
      <Home userData={userData} setUserData={setUserData}/>
    </>
  )
}

export default App
