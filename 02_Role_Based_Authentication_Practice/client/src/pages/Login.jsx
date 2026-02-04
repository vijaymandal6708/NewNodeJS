import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [data,setData] = useState({});

    const handleInput = async (e)=>{
      console.log(e.target.value);
      setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    };

    const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        console.log(data);
        const response = await axios.post("http://localhost:4000/user/login", data);
        alert(response.data.message);
      } catch (error) {
        alert(error.response.data.message);
      }
    }

  return (
    <>
      <h1>This is the login page</h1>

      <form onSubmit={handleSubmit}>
        Enter email : <input type="email" name="email" onChange={handleInput} /> <br /> <br />
        Enter password : <input type="password" name="password" onChange={handleInput} /> <br /> <br />

        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
