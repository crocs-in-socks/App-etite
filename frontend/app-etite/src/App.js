import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './Login';
import SignUp from './SignUp';

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          
        </Routes>
      </BrowserRouter>
  )
}

export default App


