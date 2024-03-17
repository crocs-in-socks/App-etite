const mongoose = require('mongoose')

const CalorieSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    totalCalories: {
        type: Number
    }

})
const CaloriesSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    calorieHistory : [CalorieSchema]

})

const Calories = mongoose.model('Calories',CaloriesSchema)

module.exports = Calories