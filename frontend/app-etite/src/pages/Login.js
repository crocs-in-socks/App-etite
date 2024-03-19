import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import "../styles/Login.css"
import BackButton from "../components/BackButton.js"

function Login() {

  const navigate = useNavigate()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e) => {
    try{
        e.preventDefault()
        const data = {username,password}
        const response = await axios.post('/login', data);
        if(response.status===200)
        {
          navigate('/home')
        }
    }catch(error){
        alert(error.response.data)
        console.log(error.response.data)
    }
  }

  function handleNavigate() {
	navigate("/signup")
  }

  return (
    <div className="responsive-container login-form">
		{/* <BackButton /> */}

		<h1 className="h2-sizing gradient-text">Login to App-etite</h1>

		<form className="login-form__form" onSubmit={handleSubmit}>
			<input required type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)}></input>
			<input required type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}></input>
			<a onClick={handleNavigate} className="blue-text-link">Don't have an account? Sign up</a>
			<button className="gradient-button login-button" >Login to App-etite</button>
		</form>
	</div>
  )
}

export default Login