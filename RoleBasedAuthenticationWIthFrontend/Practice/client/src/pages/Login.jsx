import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    
    const [data,setData] = useState({});

    const navigate = useNavigate();

    const handleInput = async (e) => {
       setData({...data,[e.target.name]:e.target.value});
    };

    const handleSubmit = async () => {
      console.log(data);
       const response = await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth/login`, data);

       localStorage.setItem("token", response.data.token);
       localStorage.setItem("role", response.data.role);

       console.log(response.data.token);
       alert(response.data.message);

       navigate("/user-dashboard");
    };

  return (  
    <>
      <h2>This is the Login page</h2>
      <br /> <br />
      Enter Email : <input type="text" name="email" onChange={handleInput} /> <br /> <br />
      Enter Password : <input type="text" name="password" onChange={handleInput} /> <br /> <br />
      <button type="submit" onClick={handleSubmit}>Login</button>
    </>
  )
}

export default Login
