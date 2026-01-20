import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout/>}>
             <Route index element={<Register/>}></Route>
             <Route path="/register" element={<Register/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
