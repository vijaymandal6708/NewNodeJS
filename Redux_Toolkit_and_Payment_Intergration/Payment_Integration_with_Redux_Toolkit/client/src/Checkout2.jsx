import { useSelector } from "react-redux";

const Checkout = () => {

  const cartItems = useSelector((state) => state.cart.items);

  const grouped = {};

  cartItems.forEach((item) => {
    if (grouped[item.id]) {
      grouped[item.id].quantity += 1;
    } else {
      grouped[item.id] = {
        ...item,
        quantity: 1,
      };
    }
  });

  const finalItems = Object.values(grouped);

  const cartTotal = finalItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = 99;

  const finalAmount = cartTotal + deliveryCharge;

  const handlePayment=async()=>{
     const response = await fetch("http://localhost:4000/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({amount: finalAmount}),
     });

     const data = await response.json();

     const options = {
        key: "rzp_test_SPo6d8iEYKD89U",
        amount: data.amount,
        currency: "INR",
        name: "Gadget Galaxy",
        description: "Order Payment",
        order_id: data.id,

        handler: function(response){
            alert("Payment Success");
            console.log(response);
        },
     };

     const rzp = new window.Razorpay(options);
     rzp.open();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h2>Checkout</h2>

      {finalItems.map((item, index) => (
        <div
          key={index}
          style={{
            height:"125px",
            width: "900px",
            border: "1px solid black",
            padding: "0px 40px",
            lineHeight: "10px"
          }}
        >
          <p>{item.name}</p>
          <p>Price : {item.price}</p>
          <p>Quantity : {item.quantity}</p>
          <p>Total : {item.price * item.quantity}</p>
        </div>
      ))}

      <div style={{ lineHeight: "17px" }}>
        <h3>Cart Total : {cartTotal}</h3>
        <h3>Delivery Charge : {deliveryCharge}</h3>
        <h2>Final Amount : {finalAmount}</h2>
      </div>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;