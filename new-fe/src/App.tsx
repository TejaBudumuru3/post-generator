
import './App.css'
import LandingPage from './routes/LandingPage'
import Login from './components/Login';
import Register from './components/Register';
import { Background } from './components/Background';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Home from './routes/Home';
import Cookie from './components/Cookie';


function App() {

  return (
    <>
    <Background/>
    <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/auth/callback' element={<Cookie/>}/>
        </Routes>
        </Router>
    </>
  )
}

export default App
