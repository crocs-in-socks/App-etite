import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import BackButton from "../components/BackButton.js"
import "../styles/NutritionalPage.css"

function NutritionalPage() {

  let { food } = useParams();

  const [servingSize, setServingSize] = useState(0)
  const [calories, setCalories] = useState(0)
  const [totalfat, setTotalFat] = useState(0)
  const [saturatedFat, setsaturatedFat] = useState(0)
  const [cholestrol, setCholestrol] = useState(0)
  const [sodium, setSodium] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [fiber, setFiber] = useState(0)
  const [sugar, setSugar] = useState(0)
  const [protein, setProtein] = useState(0)
  const [imgsrc, setImgSrc] = useState('')

  const fetchNutrition = async () => {
    try{
        const response = await axios.get('/nutrition',{
            params: {
                food
            }
        })
        setServingSize(response.data.serving_size_g)
        setCalories(response.data.calories)
        setTotalFat(response.data.fat_total_g)
        setsaturatedFat(response.data.fat_saturated_g)
        setCholestrol(response.data.cholestrol_mg)
        setSodium(response.data.sodium_mg)
        setCarbs(response.data.carbohydrates_total_g)
        setFiber(response.data.fiber_g)
        setSugar(response.data.sugar_g)
        setProtein(response.data.protein_g)

    }catch(e)
    {
        console.log(e.message)
    }
  }
  const fetchImageUrl = async() => {
    try{
        const response = await axios.get('/imagesearch',{
            params: {
                food
            }
        })
        if(response.status === 200)
        {
            setImgSrc(response.data)
        }
    }catch(e)
    {
        console.log(e)
    }
  }
  
  useEffect(()=>
  {
    fetchNutrition()
    fetchImageUrl()
  }, [])

  function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="responsive-container nutritional-info">
		<BackButton />

		<h1 className="gradient-text h2-size">Nutritional Information</h1>

		<div className="responsive-left-right">
			<div className="responsive-left">
				<img className="food-image" src={imgsrc}></img>
			</div>

			<div className="responsive-right">
				<h2 className="food-title h4-sizing">{capitalizeFirstLetter(food)}</h2>
				<div className="food-properties-group">
					<p><span>Total Calories:</span> {calories}</p>
					<p><span>Protein content:</span> {protein}g</p>
					<p><span>Total fat:</span> {totalfat}g</p>
					<p><span>Saturated fat:</span> {saturatedFat}g</p>
					<p><span>Cholestrol:</span> {cholestrol}mg</p>
					<p><span>Sodium:</span> {sodium}mg</p>
					<p><span>Carbohydrates:</span> {carbs}g</p>
					<p><span>Fiber:</span> {fiber}g</p>
					<p><span>Sugar:</span> {sugar}g</p>
				</div>
			</div>
		</div>
    </div>
  )
}

export default NutritionalPage