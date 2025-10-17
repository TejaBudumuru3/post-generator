
import './App.css'
import LandingPage from './routes/LandingPage'
import Login from './components/Login';
import Register from './components/Register';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';


function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        </Router>
    </>
  )
}

export default App
