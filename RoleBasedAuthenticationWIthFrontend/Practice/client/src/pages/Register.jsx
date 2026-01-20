import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
   
    const [data,setData] = useState({});

    const handleInput = async (e)=>{
       console.log(e.target.value);
       setData({...data,[e.target.name]:e.target.value});
    };

    const handleSubmit = async ()=>{
       console.log(data);
       await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth/register`, data);
    };

  return (
    <>
      <h2>This is the register page</h2>
      Enter Name : <input type="text" name="name" onChange={handleInput} /> <br /> <br />
      Enter Name : <input type="text" name="email" onChange={handleInput} /> <br /> <br />
      Enter Name : <input type="text" name="password" onChange={handleInput} /> <br /> <br />

      <button type="submit" onClick={handleSubmit}>Register</button>
    </>
  )
}

export default Register
