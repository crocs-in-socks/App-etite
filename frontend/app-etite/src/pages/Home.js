import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CameraComponent from '../components/CameraComponent'
import ImageDisplay from '../components/ImageDisplay'

function Home() {

    const [search,setSearch] = useState('food')
    const [searchRecipes, setSearchRecipes] = useState('chicken')

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
        //console.log(response.data.prediction)
        navigate('/nutrition/' + response.data.prediction)
      }
      catch(error) {
        console.log(error)
      }
  }

    const [capturedImage, setCapturedImage] = useState(null)
    const handleCapture = (imageData) => {
      setCapturedImage(imageData)
    }
    const routeToNutrition = (e) => {
      e.preventDefault()
      navigate('/nutrition/' + search)
    }
    const routeToRecipe = (e) => {
      e.preventDefault()
      navigate('/recipe/' + searchRecipes)
    }

    return (
        <div>Home
            <CameraComponent onCapture={handleCapture} />
            <ImageDisplay imageData={capturedImage} />
            <button onClick={sendToBackend}>Upload Image</button>
            <button onClick={handleLogout}>Logout</button>
            <p>Looking for Nutritional Info?</p>
            <form onSubmit={routeToNutrition}>
              <input placeholder='Search for specific food...' onChange={(e) => setSearch(e.target.value)}></input>
              <button type='submit'>search</button>
            </form>
            <p>Looking for recipes?</p>
            <form onSubmit={routeToRecipe}>
              <input placeholder='Enter space separated ingredients..' onChange={(e) => setSearchRecipes(e.target.value)}></input>
              <button type='submit'>search</button>
            </form>
        </div>
  )
}

export default Home