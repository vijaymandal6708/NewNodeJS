import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux-toolkit/cartSlice";

function App() {
    const products = [
      {id:"1", name:"Boat Earbuds", price:"1699"},
      {id:"2", name:"Realme Earbuds", price:"1399"},
      {id:"3", name:"Boat Speaker", price:"1199"},
      {id:"4", name:"Sony Speaker", price:"3799"},
      {id:"5", name:"Oneplus 12 Smartphone", price:"59999"},
      {id:"6", name:"Iphone 16 Pro Max", price:"159990"},
    ];

    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart.items);

  return (
    <>
      {cart.length}

      <div className="main-container" style={{display:"flex",gap:"35px",flexWrap:"wrap",justifyContent:"space-between",padding:"30px"}}>
          {
            products.map((product,index)=>(
               <div className="products" key={index} style={{height:"320px",width:"250px",border:"1px solid black",padding:"25px",boxSizing:"border-box"}}>
                 <div className="description" style={{marginBottom:"160px"}}>
                  <h4>{product.name}</h4>
                  <h4>{product.price}</h4>
                 </div>
                 <button onClick={()=>{dispatch(addToCart(product))}}>Add to cart</button>
               </div>
            ))
          }
      </div>
    </>
  )
}

export default App
