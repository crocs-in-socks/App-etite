import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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

  return (
    <div>
        {food}
        <img src={imgsrc}></img>
        <p>Serving size: {servingSize}</p>
        <p>Total Calories: {calories}</p>
        <p>Protein content: {protein}g</p>
        <p>Total fat: {totalfat}g</p>
        <p>Saturated fat: {saturatedFat}g</p>
        <p>Cholestrol: {cholestrol}mg</p>
        <p>Sodium: {sodium}mg</p>
        <p>Carbohydrates: {carbs}g</p>
        <p>Fiber: {fiber}g</p>
        <p>Sugar: {sugar}g</p>
    </div>
  )
}

export default NutritionalPage