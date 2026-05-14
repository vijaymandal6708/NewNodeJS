import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "./Redux-toolkit/cartSlice";


function App() {
  
   const products = [
    {
      name: "boat stone 181",
      price: 149
    },
    {
      name: "sony headphone",
      price: 249
    }
   ]

   const cart = useSelector((state)=>state.cart);
   const dispatch = useDispatch();

  return (
    <>
       {cart.length}
      <div className="container" style={{display:"flex",gap:"25px"}}>
        {
          products.map((product,index)=>(
            <div className="product" key={index} style={{height:"250px",width:"200px",border:"1px solid black",padding:"25px",boxSizing:"border-box"}}>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button style={{marginTop:"80px"}} onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
