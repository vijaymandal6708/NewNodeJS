import { useSelector } from "react-redux";


const Checkout = () => {
    const cartItems = useSelector((state)=>state.cart.items);
    console.log(cartItems);

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
       const response = await fetch("http://localhost:4000/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({amount:finalAmount})
       });

       const data = await response.json();

       const options = {
        key: "",
        amount: data.amount,
        currency: "INR",
        name: "Gadget Galaxy",
        description: "Order Payment",
        order_id: data.id,

        handler: function(response){
            alert("Payment Success");
            console.log(response)
        }
       };

       const rzp = new window.Razorpay(options);
       rzp.open();
    }
  return (
    <>
      <h2>Checkout</h2>
      {
        finalItems.map((product,index)=>(
            <div className="product" key={index} style={{border:"1px solid black"}}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
                <p>Total price : {product.price*product.quantity}</p>
            </div>
        ))
      }
      <p>{cartTotal}</p>
      <p>{deliveryCharge}</p>
      <p>{finalAmount}</p>

      <button onClick={handlePayment}>Pay Securely</button>
    </>
  )
}

export default Checkout