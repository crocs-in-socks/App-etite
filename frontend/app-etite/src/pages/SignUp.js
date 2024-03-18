import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'

import BackButton from "../components/BackButton.js"
import "../styles/Signup.css"

function SignUp() {

  const navigate = useNavigate()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [repassword,setRepassword] = useState('')

  const handleSubmit = async (e) => {
    try{
        e.preventDefault()
        if(password!==repassword)
        {
          alert('Passwords do not match')
          return
        }
        if(password.length < 6)
        {
          alert('Password must be atleast 6 characters')
          return
        }
        const data = {username,password}
        console.log(data)
        const response = await axios.post('/signup', data);
        if(response.status===200)
        {
            navigate('/login')
        }
        else{
            throw new Error('sign up unsuccessful')
        }
    }catch(error){
        alert(error.response.data)
    }
  }

  return (
    <div className="responsive-container signup-form">
		<BackButton />

		<h1 className="h2-sizing gradient-text">Sign up for App-etite</h1>

        <form onSubmit={handleSubmit} className="signup-form__form">
            <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></input>
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="password" placeholder='re-enter password'onChange={(e)=>setRepassword(e.target.value)}></input>
            <button className="gradient-button" type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default SignUp