import { useSelector } from "react-redux";

const Cart = () => {

  const cartItems = useSelector((state)=>state.cart.items);

  const grouped = {};

  cartItems.forEach((item)=>{

    if(grouped[item.id]){
      grouped[item.id].quantity += 1;
    }else{
      grouped[item.id] = {
        ...item,
        quantity:1
      };
    }

  });

  const finalItems = Object.values(grouped);

  return (
    <div className="container" style={{padding:"15px 50px", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h2>Cart</h2><br/>

      {finalItems.map((item,index)=>(
        <div key={index} style={{border:"1px solid black", height:"130px", width:"1200px", padding:"16px 35px"}}>
          <h4>{item.name}</h4>
          <h4>{item.price}</h4>
          <h4>Quantity: {item.quantity}</h4>
        </div>
      ))}

    </div>
  )
}

export default Cart;