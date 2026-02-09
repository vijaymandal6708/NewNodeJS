import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />}></Route>
              <Route path="home" element={<Home />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="login" element={<Login />}></Route>
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
