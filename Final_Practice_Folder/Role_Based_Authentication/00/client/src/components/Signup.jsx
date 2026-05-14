import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({});

  const handleInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        user,
      );

      alert(response.data.msg);
    } catch (error) {
        alert(error.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        enter name :{" "}
        <input type="text" name="userName" onChange={handleInput} /> <br />{" "}
        <br />
        enter email : <input
          type="text"
          name="email"
          onChange={handleInput}
        />{" "}
        <br /> <br />
        enter password :{" "}
        <input type="text" name="password" onChange={handleInput} /> <br />{" "}
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
