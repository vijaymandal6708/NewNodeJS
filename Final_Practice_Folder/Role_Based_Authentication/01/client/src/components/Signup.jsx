import React, { useEffect, useState } from 'react';
import axios from "axios";

const Signup = () => {
    const [user,setUser] = useState({});

    const handleInput = ((e)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}));
    });

    const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log(user);
        const response = await axios.post("http://localhost:8000/user/signup", user);
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        username: <input type="text" name='userName' onChange={handleInput} /> <br /> <br />
        email: <input type="text" name='email' onChange={handleInput} /> <br /> <br />
        password: <input type="password" name='password' onChange={handleInput} /> <br /> <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
