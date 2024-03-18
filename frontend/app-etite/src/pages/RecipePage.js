import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function RecipePage() {

  let { query } = useParams();
  
  const fetchRecipe = async () => {
    try{
        const response = axios.get('/recipe',{
            params: {
                q: query
            }
        })

    }catch(e)
    {
        console.log(e.message)
    }
  }

  useEffect(()=>{
    fetchRecipe()
  },[])

  return (
    <div>{query}</div>
  )
}

export default RecipePage