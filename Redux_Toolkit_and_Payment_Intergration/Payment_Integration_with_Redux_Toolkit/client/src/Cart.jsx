import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
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
    0,
  );

  const deliveryCharge = 99;

  const finalAmount = cartTotal + deliveryCharge;

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>Cart</h2>
        {finalItems.map((item, index) => (
          <div
            className="product"
            key={index}
            style={{
              height: "180px",
              width: "1350px",
              border: "1px solid black",
              padding: "10px 50px",
              boxSizing: "border-box",
            }}
          >
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>Quantity : {item.quantity}</p>
            <p>Total : {item.price * item.quantity}</p>
          </div>
        ))}
        <div className="total-amount" style={{lineHeight:"17px"}}>
          <h3>Cart Total : {cartTotal}</h3>
          <h3>Delivery Charge : {deliveryCharge}</h3>
          <h3>Final Amount : {finalAmount}</h3>
        </div>
        <Link to="/checkout"><button>Proceed to Checkout</button></Link>
      </div>
    </>
  );
};

export default Cart;
