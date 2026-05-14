import { useCart } from "./context/CartContext";

function App() {
  const { cart, addToCart } = useCart();

  const products = [
    { id: 1, name: "iPhone 15", price: 80000 },
    { id: 2, name: "Samsung S24", price: 70000 },
  ];

  return (
    <div>
      <h2>Products</h2>

      {products.map(product => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>

      {cart.map((item, index) => (
        <p key={index}>
          {item.name} - ₹{item.price}
        </p>
      ))}
    </div>
  );
}

export default App;