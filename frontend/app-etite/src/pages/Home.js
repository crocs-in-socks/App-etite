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

	function uploadImageButton() {
		return <button className="gradient-button" onClick={sendToBackend}>Upload Image</button>
	}

	function handleNavigate() {
		navigate("/track")
	}

	function handleNavigate2() {
		navigate("/quiz")
	}

    return (
        <div className="responsive-container homepage">
			<div className="header-group">
				<a href="/"><h1 className="h2-sizing gradient-text">App-etite</h1></a>
				<a className="logout-button" onClick={handleLogout}>Logout</a>
			</div>
			
			<div className="homepage-info-container">

			
			<div className="homepage-info-left">	
				<ImageDisplay imageData={capturedImage} />
				<CameraComponent uploadButton={uploadImageButton} onCapture={handleCapture} />
				{/* {uploadImageButton()} */}
			</div>
            
            <div className="homepage-info-right">
				<form onSubmit={routeToNutrition}>
					<h2 className="input-subtitle h4-sizing">Looking for nutritional info?</h2>
					<input required id="fod-inp" type="text" placeholder='Search for food' onChange={(e) => setSearch(e.target.value)}></input>
					<button className="gradient-button" type='submit'>Search</button>
				</form>

				<form onSubmit={routeToRecipe}>
					<h2 className="input-subtitle h4-sizing">Looking for recipes?</h2>
					<input required id="ing-inp" type="text" placeholder='Enter ingredients' onChange={(e) => setSearchRecipes(e.target.value)}></input>
					<button className="gradient-button" type='submit'>Search</button>
				</form>

				<div className="title-button">
					<h2 className="input-subtitle h4-sizing">View your calorie history</h2>
					<button onClick={handleNavigate} className="gradient-button">Calorie Tracking</button>
				</div>

				<div className="title-button">
					<h2 className="input-subtitle h4-sizing">Don't know what to eat?</h2>
					<button onClick={handleNavigate2} className="gradient-button">Check out the Food Recommendation Quiz</button>
				</div>

			</div>
            
			</div>
        </div>
  )
}

export default Home