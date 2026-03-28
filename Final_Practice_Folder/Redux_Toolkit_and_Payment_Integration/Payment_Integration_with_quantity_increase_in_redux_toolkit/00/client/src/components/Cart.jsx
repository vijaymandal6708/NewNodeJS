import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector((state)=>state.cart);

    const cartTotal = cartItems.reduce((sum,item)=> sum + item.price * item.quantity , 0);

    const deliveryCharge = 99;

    const finalAmount = cartTotal+deliveryCharge;

  return (
    <div style={{display:"flex",flexDirection:"column",padding:"30px 140px"}}>
        <h2 style={{paddingLeft:"550px"}}>Cart Page</h2>
       {
        cartItems.map((product,index)=>(
            <div className="product" key={index} style={{height:"180px",width:"1200px",border:"1px solid black",padding:"10px 50px",boxSizing:"border-box"}}>
                <p>name : {product.name}</p>
                <p>price : {product.price}</p>
                <p>quantity : {product.quantity}</p>
                <p>total : {product.price*product.quantity}</p>
            </div>
        ))
       }
       <h4>cart total : {cartTotal}</h4>
       <h4>delivery charge : {deliveryCharge}</h4>
       <h4>finalAmount : {finalAmount}</h4>
       <button><Link to="/checkout">Proceed to Checkout</Link></button>
    </div>
  )
}

export default Cart
