import { useContext } from "react"
import { CartContext } from "../context/Cart"


const Cart = () => {
    const cart = useContext(CartContext);
  return (
    <div className='cart'>
      <br />
      <hr />
      <h1>Cart</h1>
      {
        cart && cart.items.map((item,index)=>(
            <li key={index}>{item.name}- ${item.price}</li>
        ))
      }
    </div>
  )
}

export default Cart
