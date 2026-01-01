import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CALLED");
    console.log("USERTYPE:", usertype);

    try {
      if (usertype === "admin") {
        const api = `${import.meta.env.VITE_BACKENDURL}/admin/login`;
        const res = await axios.post(
          api,
          { adminEmail, adminPassword },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.setItem("adminname", res.data.admin.name);
        localStorage.setItem("adminemail", res.data.admin.email);
        localStorage.setItem("adminid", res.data.admin.id);

        toast.success(res.data.msg);
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      }

      if (usertype === "user") {
        const api = `${import.meta.env.VITE_BACKENDURL}/user/login`;

        const res = await axios.post(api, {
          email: adminEmail, // reuse same input
          password: adminPassword,
        });

        toast.success(res.data.msg);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="glow-circle"></div>
        <div className="orb"></div>
        <div className="light-ray ray1"></div>
        <div className="light-ray ray2"></div>

        <div className="sparkle s1"></div>
        <div className="sparkle s2"></div>
        <div className="sparkle s3"></div>
        <div className="sparkle s4"></div>
        <div className="sparkle s5"></div>
        <div className="sparkle s6"></div>

        <h1>Power Up Your Tech World</h1>
        <p>
          Discover the latest electronic gadgets, smart accessories, and
          cutting-edge technology—all in one place. Log in to manage products,
          orders, and updates with ease.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to Continue</h2>

          <label>Email Address</label>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <label>Select User Type</label>
          <select
            value={usertype}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="">Select user type</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Login</button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
