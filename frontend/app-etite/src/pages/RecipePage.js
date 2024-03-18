import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Recipe from '../components/Recipe';

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
    <div>
        {query}
        {recipes.map((item, index) => (
			<Recipe key={index} name={item.label} imgSrc={item.image} recipe={item.recipe}/>
		))}
    </div>
  )
}

export default RecipePage