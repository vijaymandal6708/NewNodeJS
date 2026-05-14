import { useContext } from "react";
import CartProvider, { CartContext } from "./cartContext";

const products = [
  {
    id: 1,
    name: "iPhone",
    price: 80000,
  },
  {
    id: 2,
    name: "Samsung",
    price: 60000,
  },
];

const Product = () => {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add To Cart
          </button>
        </div>
      ))}

      <h1>Cart Items</h1>

      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Product />
    </CartProvider>
  );
}

export default App;