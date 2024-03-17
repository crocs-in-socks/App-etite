const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    calorieGoal: {
        type: Number,
        default: 2000
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User