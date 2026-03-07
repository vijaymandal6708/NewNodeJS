import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Redux-Toolkit/cartSlice";
import store from "./Redux-Toolkit/store";

function App() {
     const products = [
      {id: 1, name: "Boat SmartWatch", price: 1800},
      {id: 2, name: "Noise SmartWatch", price: 2300},
      {id: 3, name: "JBL Headphones", price: 6500},
      {id: 4, name: "Sony Headphones", price: 8200},
      {id: 5, name: "Mivi Speaker", price: 1700},
      {id: 6, name: "Boat Stone 181", price: 1100},
     ];

     const dispatch = useDispatch();
     const cart = useSelector((state)=>state.cart);

  return (
    <>
      <h4>{cart.length}</h4>

      <div className="container" style={{display:"flex", gap:"30px", flexWrap:"wrap", padding:"30px"}}>
        {
          products.map((key,index)=>(
            <div className="product" key={index} style={{height:"320px", width:"263px", border:"1px solid black", padding:"30px", boxSizing:"border-box"}} >
              <h4>{key.name}</h4>
              <h4>id : {key.id}</h4>
              <h4>{key.price}</h4>
              <br /> <br /> <br /> <br /> <br />
              <button onClick={()=>{
                dispatch(addToCart(key));
              }}>Add to cart</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
