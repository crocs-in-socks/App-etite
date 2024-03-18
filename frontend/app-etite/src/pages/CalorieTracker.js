import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import CalorieHistoryCard from '../components/CalorieHistoryCard'
import TodayCalorieHistory from '../components/TodayCalorieHistory'

function CalorieTracker() {

  const [calories, SetCalories] = useState(0)
  const [calorieGoal, setCalorieGoal] = useState(2000)
  const [newGoal, setNewGoal] = useState(2000)
  const [foodConsumed, setFoodConsumed] = useState('')
  const [calorieHistory, setCalorieHistory] = useState([])
  const [todaysFood, setTodaysFood] = useState([])

  const fetchtodaysfood = async () => {
    setTodaysFood(Cookies.get('todaysfood')?.split(',').map(item => item.trim()) || []);
  }

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
  const fetchCalorieHistory = async() => {
    try {
      const response = await axios.get('/caloriehistory');
      if (response.status === 200) {
          setCalorieHistory(response.data)
      }
    } catch (error) {
        console.error(error);
    }
  }
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

  useEffect(() => {
    
    
    fetchCalorieGoal()
    fetchCalories();
    fetchCalorieHistory()
    fetchtodaysfood()
}, []);


  const handleCalorieSubmit = async (e) => {
    e.preventDefault()
    try{
        const response = await axios.post('/calories',{foodConsumed})

        const todaysfood = Cookies.get('todaysfood');
        const newFoodConsumed = todaysfood ? `${foodConsumed}, ${todaysfood}` : foodConsumed;

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        Cookies.set('todaysfood', newFoodConsumed, { expires: endOfDay });

        const getresponse = await axios.get('/calories')
        if(getresponse.status === 200)
        {
          SetCalories(getresponse.data.calories)
        }
        console.log(getresponse.data.calories)

        fetchtodaysfood()
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
            <p>What you've eaten today</p>
            <div>
                {todaysFood.map((item, index) => (
                  <TodayCalorieHistory key={index} food={item} />
                ))}
            </div>
            <p>How much you've eaten before</p>
            <div>
                {calorieHistory.map((item, index) => (
                  <CalorieHistoryCard key={index} date={item.date} calories={item.totalCalories} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default CalorieTracker