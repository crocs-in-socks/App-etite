import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Quiz from "./pages/Quiz"
import CalorieTracker from './pages/CalorieTracker';
import ProtectedRoute from './ProtectedRoute';
import NutritionalPage from './pages/NutritionalPage';
import RecipePage from './pages/RecipePage';


function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<ProtectedRoute>  <Home/>   </ProtectedRoute>}  />
          <Route path="/track" element={<ProtectedRoute>  <CalorieTracker/>   </ProtectedRoute>}  />
          <Route path="/quiz" element={<ProtectedRoute>  <Quiz/>   </ProtectedRoute>}  />
          <Route path="/recipe/:query" element={<ProtectedRoute>  <RecipePage/>   </ProtectedRoute>}  />
          <Route path="/nutrition/:food" element={<ProtectedRoute>  <NutritionalPage/>   </ProtectedRoute>}  />
          
        </Routes>
      </BrowserRouter>
  )
}

export default App


