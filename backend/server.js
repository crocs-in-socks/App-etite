const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {signup, login} = require('./routers/userRouter')
const {getNutrition} = require('./routers/externalapi')
const {updateCalories, getTodaysCalories, updateCalorieGoal, getCalorieGoal, getCalorieHistory} = require('./routers/calorieRouter')
const {getNextQuestion} = require('./routers/quizRouter')

//const cors = require('cors');



const app = express()
app.use(bodyParser.json());
app.use(cookieParser())
//app.use(cors());
mongoose.connect(process.env.MONGOURL)

//app.get('/', (req, res) => res.send("hello, world!"))

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({message: 'Token not found'});
    }
    jwt.verify(token,'appetitejwtkey', (error, decoded) => {
        if (error) {
            res.clearCookie('jwtToken', { path: '/' });
            return res.status(403).json({message: 'Invalid token'})
        }
        req.userId = decoded.userId;
        next();
    });
};
app.get('/checkjwt',verifyToken,(req,res)=>{ //Used for client side authentication
    res.status(200).send()
})

app.post('/signup',async (req,res)=>{
    try{
        const { username, password } = req.body;
        await signup(username, password);
        res.status(200).send('Signup successful');
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})
app.post('/calories', verifyToken, async(req,res) => {
    try{
        const {foodConsumed} = req.body
        const response = await getNutrition(foodConsumed)

        //console.log(response.items[0].calories)
        const userId = req.userId
        await updateCalories(userId, response.items[0].calories)

        res.status(200).json(response.items)
        //console.log(response.items)
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})
app.get('/calories',verifyToken, async (req,res) => {
    try{
        
        const userId = req.userId
        const response = await getTodaysCalories(userId)
        console.log(response)
        res.status(200).json({calories: response})
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})
app.get('/foodcalorie',verifyToken,async(req,res) => {
    try{
        const food = req.query.food
        const response = await getNutrition(food)
        res.status(200).json(response.items[0].calories)
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})
app.get('/caloriehistory',verifyToken,async(req,res)=>{
    try{
        const userId = req.userId
        const response = await getCalorieHistory(userId)
        res.status(200).json(response)
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})
app.patch('/caloriegoal',verifyToken, async(req,res)=>{
    try{
        const userId = req.userId
        const {calorieGoal} = req.body
        //console.log(calorieGoal)

        await updateCalorieGoal(userId, calorieGoal)
        res.status(200).send()
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})
app.get('/caloriegoal',verifyToken, async(req,res)=>{
    try{
        const userId = req.userId
        const response = await getCalorieGoal(userId)
        console.log(response)
        res.status(200).json(response)
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

app.get('/getnextquestion', verifyToken, async(req, res)=>{
    try {
        const answers = req.query.answers
        const response = await getNextQuestion(answers)
        console.log(response)
        res.status(200).json(response)
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        res.clearCookie('jwtToken', { path: '/' });
        const { username, password } = req.body;
        const token = await login(username, password);

        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000,
            path: '/'
        });
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message);
    }
});
app.post('/logout',(req,res)=>{
    res.clearCookie('jwtToken', { path: '/' });
    res.status(200).send()
})

app.listen(5000, () => console.log("Server listening on http://localhost:5000"))