import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const response = await axios.post("http://localhost:8000/user/login",user);
      alert(response.data.msg);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
        alert(error.response.data.msg);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        email: <input type="text" name="email" onChange={handleInput} /> <br />{" "}
        <br />
        password:{" "}
        <input
          type="password"
          name="password"
          onChange={handleInput}
        /> <br /> <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
