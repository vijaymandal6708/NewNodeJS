import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      data
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <>
      Enter Email : <input name="email" onChange={e => setData({...data, email:e.target.value})} />
      Enter Password : <input name="password" type="password"
        onChange={e => setData({...data, password:e.target.value})} />
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
