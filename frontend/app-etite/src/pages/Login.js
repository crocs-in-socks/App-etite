import React,{ useState} from 'react'
import axios from 'axios'

function Login() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e) => {
    try{
        e.preventDefault()
        const data = {username,password}
        const response = await axios.post('/login', data);
        if(response.status===200)
        {
          alert('successfully logged in')
          //navigate('/home')
        }
    }catch(error){
        alert(error.response.data)
        console.log(error.response.data)
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter Username' onChange={(e)=>setUsername(e.target.value)}></input>
        <input type='password' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}></input>
        <button >Login</button>
      </form>
    </div>
  )
}

export default Login