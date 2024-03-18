import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Recipe from '../components/Recipe';
import BackButton from "../components/BackButton.js"

import "../styles/RecipePage.css"

function RecipePage() {

  const [recipes, setRecipes] = useState([])

  let { query } = useParams();
  
  const fetchRecipe = async () => {
    try{
        console.log('hi')
        const response = await axios.get('/recipe',{
            params: {
                q: query
            }
        })
        setRecipes(response.data)

    }catch(e)
    {
        console.log(e.message)
    }
  }

  useEffect(()=>{
    fetchRecipe()
    
  },[])

  return (
    <div className="responsive-container recipe-page">
		<BackButton />
		<h1 className="h2-sizing gradient-text">Recipes</h1>

		<div className="recipe-cards-group">
			{recipes.map((item, index) => (
				<Recipe key={index} name={item.label} imgSrc={item.image} recipe={item.recipe}/>
			))}
		</div>
    </div>
  )
}

export default RecipePage