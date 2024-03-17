import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import CalorieTracker from './pages/CalorieTracker';
import ProtectedRoute from './ProtectedRoute';


function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<ProtectedRoute>  <Home/>   </ProtectedRoute>}  />
          <Route path="/track" element={<ProtectedRoute>  <CalorieTracker/>   </ProtectedRoute>}  />
          
          
        </Routes>
      </BrowserRouter>
  )
}

export default App


