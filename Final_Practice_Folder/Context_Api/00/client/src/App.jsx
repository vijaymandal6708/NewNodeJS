import { useCart } from "./context/CartContext";

function App() {
  const products = [
    { id: 1, name: "boat stone 181", price: 149 },
    { id: 2, name: "sony headphone", price: 249 }
  ];

  const { cart, dispatch } = useCart();

  return (
    <>
      <h2>Cart Items: {cart.length}</h2>

      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>₹{product.price}</p>

          <button
            onClick={() =>
              dispatch(ADD)
            }
          >
            Add to Cart
          </button>
        </div>
      ))}

      <hr />

      <h2>Cart</h2>

      {cart.map((item) => (
        <p key={item.id}>
          {item.name} - Quantity: {item.quantity}
        </p>
      ))}
    </>
  );
}

export default App;