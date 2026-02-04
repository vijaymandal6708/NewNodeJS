import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [data,setData] = useState({});

    const handleInput = (e)=>{
        console.log(data);
        setData(()=>({...data,[e.target.name]:e.target.value}));
    };

    const handleSubmit = async (e)=>{
        try {
          e.preventDefault();
          console.log(data);
          const response = await axios.post("http://localhost:4000/user/register", data);
          console.log(response.data);
          alert(response.data.message);

        } catch (error) {
          alert(error.response.data.message);
        }
    }

  return (
    <>
      <h1>This is the register page</h1> 

      <form onSubmit={handleSubmit}>
        Enter Name : <input type="text" name="name" required onChange={handleInput} /> <br /> <br /> 
        Enter Email : <input type="email" name="email" required onChange={handleInput} /> <br /> <br />
        Enter Password : <input type="password" name="password" required onChange={handleInput} /> <br /> <br />

        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register
