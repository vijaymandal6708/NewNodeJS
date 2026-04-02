import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from "axios";

const Checkout = () => {
    const cartItems = useSelector((state)=>state.cart);

    const grouped = {};

    cartItems.forEach((item)=>{
        if(grouped[item.id]){
            grouped[item.id].quantity +=1;
        }
        else{
            grouped[item.id]={...item,quantity:1};
        }
    });

    const finalItems = Object.values(grouped);

    const cartTotal = finalItems.reduce((sum,item)=> sum + item.price * item.quantity , 0);

    const deliveryCharge = 99;

    const finalAmount = cartTotal+deliveryCharge;

    const handlePayment =async()=>{
        try {
            const response = await axios.post("http://localhost:8000/create-order", {
            amount: finalAmount
            });

            const options = {
                key: process.env.RAZORPAY_KEY,
                amount: response.data.amount,
                currency: "INR",
                name: "GadgetGalaxy",
                description: "Order Payment",
                order_id: response.data.id,
    
                handler: function(response){
                    alert("Payment Success");
                    console.log(response);
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
            alert("Payment Failed"); 
        }
    }

  return (
    <div style={{display:"flex",flexDirection:"column",padding:"30px 140px"}}>
        <h2 style={{paddingLeft:"550px"}}>Checkout Page</h2>
       {
        finalItems.map((product,index)=>(
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
       <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  )
}

export default Checkout
