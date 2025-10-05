import { useState } from 'react'
import './css/App.css';

import {Routes, Route} from "react-router-dom"

import Navbar from './components/Navbar'

import Register from './pages/Register';
import Login from './pages/Login';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Registerbooks from './pages/Registerbooks';
import Books from './pages/Books';

import MyBooks from './pages/MyBooks';
import AddReview from './pages/AddReview';
import Bookdetails from './pages/Bookdetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const location = useLocation();
  return(
    <>      

       {location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/registerbooks' && location.pathname !== '/addreview' && <Navbar IsLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
      
      <main className='main'>
      <Routes>
        
        <Route path='/' element={<Books/>}/>
       
        <Route
          path="/mybooks"
          element={
                <ProtectedRoute IsLoggedIn={isLoggedIn}>
                  <MyBooks />
                </ProtectedRoute>
              }
        />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/registerbooks' element={<Registerbooks/>}/>
        <Route path='/addreview' element={<AddReview/>}/>
        <Route path='/bookdetails' element={<Bookdetails/>}/>
      </Routes>
    </main>
    </>
    

  ) 
}



export default App
