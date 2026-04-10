import Cart from "./components/Cart";
import Item from "./components/Item";

function App() {
  

  return (
    <>
      <Item name="Macbook Pro" price={100000}></Item>
      <Item name="Pendrive" price={4000}></Item>
      <Item name="Mobile" price={35000}></Item>
      <Cart></Cart>
    </>
  )
}

export default App
