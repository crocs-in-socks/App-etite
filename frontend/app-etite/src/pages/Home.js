import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CameraComponent from '../components/CameraComponent'
import ImageDisplay from '../components/ImageDisplay'

import "../styles/Home.css"

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
    const routeToNutrition = (e) => {
      e.preventDefault()
      navigate('/nutrition/' + search)
    }
    const routeToRecipe = (e) => {
      e.preventDefault()
      navigate('/recipe/' + searchRecipes)
    }

	function uploadImageButton() {
		return <button className="gradient-button" onClick={sendToBackend}>Upload Image</button>
	}

    return (
        <div className="responsive-container homepage">
			<div className="header-group">
				<h1 className="h2-sizing gradient-text">App-etite</h1>
				<a className="logout-button" onClick={handleLogout}>Logout</a>
			</div>
			
			<div className="homepage-info-container">

			
			<div className="homepage-info-left">	
				<CameraComponent onCapture={handleCapture} />
				<ImageDisplay imageData={capturedImage} />
				{uploadImageButton()}
			</div>
            
            <div className="homepage-info-right">
				<p>Looking for Nutritional Info?</p>
				<form onSubmit={routeToNutrition}>
				<input placeholder='Search for specific food' onChange={(e) => setSearch(e.target.value)}></input>
				<button type='submit'>search</button>
				</form>
				<p>Looking for recipes?</p>
				<form onSubmit={routeToRecipe}>
				<input placeholder='Enter space separated ingredients' onChange={(e) => setSearchRecipes(e.target.value)}></input>
				<button type='submit'>search</button>
				</form>
			</div>
            
			</div>
        </div>
  )
}

export default Home