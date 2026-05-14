import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user,setUser] = useState({});

    const navigate = useNavigate();

    const handleInput=(e)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}));
    };

    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();

            const response = await axios.post("http://localhost:8000/user/login", user);

            alert(response.data.msg);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            navigate("/dashboard");
            
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        email : <input type="text" name="email" onChange={handleInput} /> <br /> <br />
        password : <input type="text" name="password" onChange={handleInput} /> <br /> <br />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
