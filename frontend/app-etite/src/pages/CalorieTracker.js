import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import CalorieHistoryCard from '../components/CalorieHistoryCard'
import TodayCalorieHistory from '../components/TodayCalorieHistory'
import BackButton from "../components/BackButton.js"

import "../styles/CalorieTracker.css"

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

	const addButton = document.querySelector(".add-manual")

    try{
		addButton.classList.add("button-disabled")
		addButton.disabled = true

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

		addButton.disabled = false
		addButton.classList.remove("button-disabled")
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

  	function renderGoalText() {
		if (calories < calorieGoal)
			return <p className="goal-text highlight-green">You haven't reached your goal yet. Eat more!</p>

		else if (calories < (calorieGoal + 200))
			return <p className="goal-text highlight-yellow">You've reached your goal. Be careful!</p>

		else
			return <p className="goal-text highlight-red">You're over your calorie goal. Go exercise!</p>
	}

  return (
    <div className="responsive-container calorie-tracker">
		<BackButton />
        <h1 className="gradient-text h2-sizing">Track Calories</h1>
        
		<div className="responsive-left-right">
		<div className="responsive-left">
			<div className="calorie-box">
					<span className="calorie-box__calories">{parseInt(calories)}</span>
					<span className="calorie-box__goal">/{calorieGoal}</span>
					<span className="calorie-box__units">kcal</span>
			</div>
			
			{renderGoalText()}
			<form className="add-manual-container" onSubmit={handleCalorieSubmit}>
				<input id="input-small" type="text" placeholder='What did you eat?' onChange={(e)=>setFoodConsumed(e.target.value)}></input>
				<button className="gradient-button add-manual" type='submit'>Add</button>
			</form>

			<form className="update-goal-container" onSubmit={updateCalorieGoal}>
				<input id="input-small-2" type="text" placeholder='Set new calorie goal' onChange={(e) => setNewGoal(e.target.value)}></input>
				<button className="gradient-button update-goal" type='submit'>Update</button>
			</form>
		</div>

		<div className="responsive-right">
			<h2 className="h4-sizing eaten-subtitle">What you've eaten today</h2>
			<div className="eaten-container">
				{todaysFood.map((item, index) => (
					<TodayCalorieHistory key={index} food={item} />
				))}
			</div>

			<h2 className="h4-sizing eaten-subtitle">How much you've eaten before</h2>
			<div className="eaten-container">
				{calorieHistory.map((item, index) => (
					<CalorieHistoryCard key={index} date={item.date} calories={parseInt(item.totalCalories)} />
				))}
			</div>
		</div>
		</div>	
    </div>
  )
}

export default CalorieTracker