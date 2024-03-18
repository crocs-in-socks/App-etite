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
    <div className="recipe-card">
        <img className="recipe-card__img" src={img}></img>
		<div className="recipe-card__desc">
			<p className="recipe-card__name">{dishname}</p>
			<p className="recipe-card__recipe">{dishrecipe }</p>
		</div>
    </div>
  )
}

export default Recipe