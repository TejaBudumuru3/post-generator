import { useEffect } from 'react';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import './App.css'
import Home from './routes/Home'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './slices/userSlice';
import LandingPage from './routes/LandingPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${URL}/getDetails`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setUser(data.data))
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      }
    };

    fetchUserData();
  }, [dispatch])
    

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
