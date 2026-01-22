import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout/>}>
             <Route index element={<Register/>}></Route>
             <Route path="/register" element={<Register/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
             <Route path="/user-dashboard" element={<UserDashboard/>}></Route>
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
