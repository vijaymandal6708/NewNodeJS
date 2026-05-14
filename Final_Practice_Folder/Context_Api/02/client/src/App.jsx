import { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Provider
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        // increase quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // add new product with qty = 1
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
const useCart = () => useContext(CartContext);

// Main App
function App() {
  const products = [
    { id: 1, name: "iPhone 15", price: 80000 },
    { id: 2, name: "Samsung S24", price: 70000 },
  ];

  return (
    <CartProvider>
      <Main products={products} />
    </CartProvider>
  );
}

// UI
const Main = ({ products }) => {
  const { cart, addToCart } = useCart();

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

      {cart.map(item => (
        <p key={item.id}>
          {item.name}  quantity :  {item.qty}
        </p>
      ))}
    </div>
  );
};

export default App;