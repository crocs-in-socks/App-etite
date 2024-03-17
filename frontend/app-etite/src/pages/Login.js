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
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </form>
    </div>
  )
}

export default Login