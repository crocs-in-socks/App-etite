import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CalorieTracker() {

  const [calories, SetCalories] = useState(0)
  const [calorieGoal, setCalorieGoal] = useState(2000)
  const [newGoal, setNewGoal] = useState(2000)
  const [foodConsumed, setFoodConsumed] = useState('')

  const fetchCalorieGoal = async()=>{
    try {
      const response = await axios.get('/caloriegoal');
      if (response.status === 200) {
          setCalorieGoal(response.data)
      }
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    const fetchCalories = async () => {
        try {
            const response = await axios.get('/calories');
            if (response.status === 200) {
                SetCalories(response.data.calories);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchCalorieGoal()
    fetchCalories();
}, []);


  const handleCalorieSubmit = async (e) => {
    e.preventDefault()
    try{
        const response = await axios.post('/calories',{foodConsumed})
        //SetCalories(calories + response.data[0].calories)
        //console.log(response.data[0].calories)

        const getresponse = await axios.get('/calories')
        if(getresponse.status === 200)
        {
          SetCalories(getresponse.data.calories)
        }
        console.log(getresponse.data.calories)
    }
    catch(e)
    {
        console.log(e.message)
    }
  }
  const updateCalorieGoal = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.patch('/caloriegoal',{calorieGoal: newGoal})
      if(response.status === 200)
      {
        console.log('calorie goal successfully updated')
      }
      fetchCalorieGoal()
    }catch(e)
    {
      console.log(e.message)
    }
  }

  return (
    <div>
        <p>Track Calories</p>
        <div>
            <p>{calories}/{calorieGoal}</p>
            {calories > calorieGoal ? <p>You're fat</p> : <p>You're skinny</p>}
            <form onSubmit={handleCalorieSubmit}>
                <input placeholder='Enter what you ate' onChange={(e)=>setFoodConsumed(e.target.value)}></input>
                <button type='submit'>Submit</button>
            </form>
            <form onSubmit={updateCalorieGoal}>
              <input placeholder='Enter new calorie goal' onChange={(e) => setNewGoal(e.target.value)}></input>
              <button type='submit' >Update Calorie goal</button>
            </form>
            <p>How much you've eaten before</p>
            <div>

            </div>
        </div>
    </div>
  )
}

export default CalorieTracker