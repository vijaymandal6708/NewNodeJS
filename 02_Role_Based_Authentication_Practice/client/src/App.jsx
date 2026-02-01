import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout />}>
             <Route index element={<Home />}></Route>
             <Route path="/home" element={<Home />}></Route>
             <Route path="/register" element={<Register />}></Route>
             <Route path="/login" element={<Login />}></Route>
             <Route path="/user-dashboard" element={<UserDashboard />}></Route>
             <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
             
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
