const User = require('../database/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signup = async (username, password) => {
    const user = await User.findOne({username})
    if(user)
    {
        throw new Error("Username is already in use")
    }
    const hashedPassword = await bcrypt.hash(password,8)
    const newUser = new User({
        username, password: hashedPassword
    })
    await newUser.save()
}

const login = async(username, password) => {
    const user = await User.findOne({username})
    if(!user)
    {
        throw new Error('User not found')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('Incorrect password')
    }
    const token = jwt.sign({userId: user._id},'appetitejwtkey')
    return token
}

module.exports = {
    signup, login
}