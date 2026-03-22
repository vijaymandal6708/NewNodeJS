import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import UserDashboard from "./components/userDashboard";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Signup/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/user-dashboard" element={<UserDashboard/>}></Route>
            <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
