import React, { useEffect, useState } from 'react'

function Recipe({name,imgSrc,recipe}) {

  const [dishname, setDishName] = useState('')
  const [img, setImg] = useState('')
  const [dishrecipe, setDishRecipe] = useState('')

  useEffect(()=>{
    setDishName(name)
    setImg(imgSrc)
    setDishRecipe(recipe)
  },[])
    
  return (
    <div>
        <p>Name: {dishname}</p>
        <img src={img}></img>
        <p>Recipe: {dishrecipe }</p>
    </div>
  )
}

export default Recipe