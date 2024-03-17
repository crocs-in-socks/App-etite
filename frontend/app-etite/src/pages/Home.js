import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try{
          const response = await axios.post('/logout')
          if(response.status === 200)
          {
            
            navigate('/login')
          }
        }catch(e)
        {
          console.log(e)
        }
      }
  return (
    <div>Home

        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home