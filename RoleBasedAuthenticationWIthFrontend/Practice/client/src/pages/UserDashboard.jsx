import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const token = localStorage.getItem("token");

  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // 👈 USER STATE

  const loadData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/dashboard/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ Authorized → store user data
      setUser(response.data.user);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>

      {/* ❌ Unauthorized */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {/* ✅ Authorized */}
      {user && (
        <div>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
