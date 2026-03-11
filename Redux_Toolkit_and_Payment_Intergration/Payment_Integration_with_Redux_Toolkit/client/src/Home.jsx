import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartSlice";
import { Link } from "react-router-dom";

function Home() {
    const products = [
      {id:"1", name:"Boat Earbuds", price:"169"},
      {id:"2", name:"Realme Earbuds", price:"139"},
      {id:"3", name:"Boat Speaker", price:"119"},
      {id:"4", name:"Sony Speaker", price:"379"},
      {id:"5", name:"Oneplus 12 Smartphone", price:"599"},
      {id:"6", name:"Iphone 16 Pro Max", price:"15999"},
    ];

    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart.items);

  return (
    <>
      
      <Link to="/cart"><h4 style={{padding:"20px 0px 0px 40px"}}>{cart.length}</h4></Link>

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

export default Home
