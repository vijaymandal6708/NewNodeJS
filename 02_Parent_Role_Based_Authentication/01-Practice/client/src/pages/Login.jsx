import React from 'react'

const Login = () => {
  return (
    <>
      <h1>this is the login page</h1>

      <form action="">
        Enter email : <input type="email" name="email" onChange={handleInput} /> <br /> <br />
      Enter password : <input type="password" name="password" onChange={handleInput} /> <br /> <br />

      <button type="submit">Login</button>
      </form>
     </>
  )
}

export default Login
