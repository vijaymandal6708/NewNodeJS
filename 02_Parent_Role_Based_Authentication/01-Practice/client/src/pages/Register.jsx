import React, { useState } from 'react';
import axios from 'axios'; 

const Register = () => {

    const [data,setData] = useState({});

    const handleInput = (e)=>{
       setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    //    setData(()=>({...data,[e.target.name]:e.target.value}));
       console.log(e.target.value);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log(data);

        const response = await axios.post("http://localhost:4500/user/register", data);
    }

  return (
    <>
      <h1>This is the register page</h1>

      <form onSubmit={handleSubmit}>
        Enter name : <input type="text" name="name" onChange={handleInput} /> <br /> <br />
        Enter email : <input type="email" name="email" onChange={handleInput} /> <br /> <br />
        Enter password : <input type="password" name="password" onChange={handleInput} />

        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register
