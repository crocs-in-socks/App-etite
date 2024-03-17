import React from 'react'

function Login() {
  return (
    <div>
        <form>
            <input placeholder='Enter username: '></input>
            <input placeholder='Enter password: '></input>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login