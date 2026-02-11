import React from 'react'

const Login = () => {
  return (
    <>
      <h1>this is the login page</h1>

      Enter email : <input type="email" name="email" onChange={handleInput} /> <br /> <br />
      Enter password : <input type="password" name="password" onChange={handleInput} /> <br /> <br />
     </>
  )
}

export default Login
