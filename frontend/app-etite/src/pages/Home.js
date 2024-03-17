import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CameraComponent from '../components/CameraComponent'
import ImageDisplay from '../components/ImageDisplay'

function Home() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
          const response = await axios.post('/logout')
          if(response.status === 200) {
            navigate('/login')
          }
        }
        catch(error) {
          console.log(error)
        }
    }

    const sendToBackend = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/infer_classifier/', {image: capturedImage})
        console.log(response)
      }
      catch(error) {
        console.log(error)
      }
  }

    const [capturedImage, setCapturedImage] = useState(null)
    const handleCapture = (imageData) => {
      setCapturedImage(imageData)
    }

    return (
        <div>Home
            <CameraComponent onCapture={handleCapture} />
            <ImageDisplay imageData={capturedImage} />
            <button onClick={sendToBackend}>Upload Image</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
  )
}

export default Home