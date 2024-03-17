import React, { useState } from 'react'
import axios from 'axios'

function CalorieTracker() {

  const [calories, SetCalories] = useState(0)
  const [foodConsumed, setFoodConsumed] = useState('')

  const handleCalorieSubmit = async (e) => {
    e.preventDefault()
    try{
        const response = await axios.post('/calories',{foodConsumed})
        SetCalories(calories + response.data[0].calories)
        //console.log(response.data[0].calories)
    }
    catch(e)
    {
        console.log(e.message)
    }
  }

  return (
    <div>
        <p>Track Calories</p>
        <div>
            <p>{calories}/2000</p>
            <p>Status text: you're fat</p>
            <form onSubmit={handleCalorieSubmit}>
                <input placeholder='Enter what you ate' onChange={(e)=>setFoodConsumed(e.target.value)}></input>
                <button type='submit'>Submit</button>
            </form>
            <button>Change daily limit</button>
            <p>How much you've eaten before</p>
            <div>

            </div>
        </div>
    </div>
  )
}

export default CalorieTracker