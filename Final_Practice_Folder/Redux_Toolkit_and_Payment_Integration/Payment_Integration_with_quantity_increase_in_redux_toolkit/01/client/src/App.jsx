import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux-toolkit/cartSlice";


function App() {

     const products = [
      { id:1, name:"boat smartwatch", price:1299 },
      { id:2, name:"oneplus smartphone", price:19999 },
      { id:3, name:"boat earbuds", price:2299 },
     ];

     const cart = useSelector((state)=>state.cart);

     const dispatch = useDispatch();

  return (
    <>
      <div className="container" style={{padding:"20px 100px"}}>
        <h2>Products</h2>
        {cart.length} <br /> <br />
        <div className="products" style={{display:"flex", gap:"25px"}}>
          {
          products.map((product,index)=>(
            <div className="product" key={product.id} style={{border:"1px solid black", height:"285px", width:"220px", boxSizing:"border-box", padding:"5px 25px"}}>
              <h4>{product.name}</h4>
              <h4>{product.price}</h4> <br /> <br /> <br /> <br /> <br /> <br /> <br />
              <button onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
            </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default App
