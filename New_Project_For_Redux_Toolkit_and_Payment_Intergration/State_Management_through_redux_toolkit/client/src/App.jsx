import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartSlice";
import Cart from "./pages/Cart";

function App() {

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <BrowserRouter>

      <div style={{ padding: "20px" }}>

        <Link to="/cart">
          <button>Cart ({cart.length})</button>
        </Link>

        <Routes>

          <Route path="/" element={
            <div>

              <h2>Products</h2>

              <div style={{ display: "flex", gap: "20px" }}>

                {products.map(product => (
                  <div key={product.id} style={{
                    border: "1px solid gray",
                    padding: "40px",
                    width: "200px",
                    height: "280px"
                  }}>
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>

                    <button onClick={() => dispatch(addToCart(product))}>
                      Add to Cart
                    </button>

                  </div>
                ))}

              </div>

            </div>
          }/>

          <Route path="/cart" element={<Cart />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;