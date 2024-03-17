const Calories = require('../database/caloriesSchema')
const User = require('../database/userSchema')

const updateCalorieGoal = async (userId, goal) => {
    console.log(goal)
    const user = await User.findById(userId)
    if(!user)
    {
        throw new Error('User not found')
    }
    user.calorieGoal = goal
    await user.save()
}
const getCalorieGoal = async (userId) => {
    const user = await User.findById(userId)
    if(!user)
    {
        throw new Error('User not found')
    }
    return user.calorieGoal
}
const updateCalories = async (userId, calories) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayscalories = await Calories.findOne({owner: userId, date: today})
    if(!todayscalories)
    {
        const newEntry = new Calories({owner: userId, date: today, totalCalories: calories})
        await newEntry.save()
    }
    else
    {
        todayscalories.totalCalories = todayscalories.totalCalories + calories
        await todayscalories.save()
    }
}
const getTodaysCalories = async(userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayscalories = await Calories.findOne({owner: userId, date: today})
    if(!todayscalories)
    {
        throw new Error('No calories found today')
    }
    return todayscalories.totalCalories
}

module.exports = {updateCalories, getTodaysCalories, getCalorieGoal, updateCalorieGoal}