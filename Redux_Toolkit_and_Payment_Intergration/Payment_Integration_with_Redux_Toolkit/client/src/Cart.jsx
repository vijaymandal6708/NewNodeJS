import { useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((state)=>state.cart.items);
  return (
    <>
      <div className="container" style={{padding:"15px 50px", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h2>Cart</h2> <br />
        {
            cartItems.map((item,index)=>(
                <div className="item" key={index} style={{border:"1px solid black", height:"180px", width:"1200px", padding:"16px 35px", boxSizing:"border-box"}}>
                    <h4>{item.name}</h4>
                    <h4>{item.price}</h4>
                    <button>Proceed to checkout</button>
                </div>
            ))
        }
      </div>
    </>
  )
}

export default Cart
