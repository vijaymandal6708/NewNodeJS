import {useSelector} from "react-redux";

function Cart() {
    const cart = useSelector((state)=>state.cart);
  return (
    <div style={{ padding: "20px" }}>

      <h2>Cart Page</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (

        cart.map((item, index) => (

          <div key={index} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px"
          }}>

            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>

            <button>Remove</button>

          </div>

        ))

      )}

    </div>
  );
}

export default Cart;