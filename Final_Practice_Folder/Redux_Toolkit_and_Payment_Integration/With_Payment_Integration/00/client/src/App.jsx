import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";


function App() {
  
  return (
    <>

        <BrowserRouter>
          <Routes>
             <Route index element={<Home/>}></Route>
             <Route path="/home" element={<Home/>}></Route>
             <Route path="/cart" element={<Cart/>}></Route>
             <Route path="/checkout" element={<Checkout/>}></Route>
          </Routes>
        </BrowserRouter>

       
    </>
  )
}

export default App
