import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CalorieHistoryCard({food}) {

  const [calories,setCalories] = useState(0)

  const fetchCalories = async(food) => {
    const getresponse = await axios.get('/foodcalorie',{
        params : {
            food: food
        }
    })
    if(getresponse.status === 200)
    {
        setCalories(getresponse.data)
    }
  }  
  useEffect(()=>{
    fetchCalories(food)
  },[])

  return (
    <div>
        <p>{food}  {calories}</p>
    </div>
  )
}

export default CalorieHistoryCard