import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function SignUp() {

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
            alert('Successfully signed up! Login to continue')
        }
        else{
            throw new Error('sign up unsuccessful')
        }
    }catch(error){
        alert(error.response.data)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='Enter username: ' onChange={(e)=>setUsername(e.target.value)}></input>
            <input placeholder='Enter password: ' onChange={(e)=>setPassword(e.target.value)}></input>
            <input placeholder='Re-enter password: 'onChange={(e)=>setRepassword(e.target.value)}></input>
            <button type='submit'>Signup</button>
        </form>
        <button onClick={async ()=>{
          const response = await axios.get('/test')
          console.log(response)
        }}>Test</button>
    </div>
  )
}

export default SignUp