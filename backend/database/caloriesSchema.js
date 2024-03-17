const mongoose = require('mongoose')

const CalorieSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    },
    totalCalories: {
        type: Number
    }

})


const Calories = mongoose.model('Calories',CalorieSchema)

module.exports = Calories