function App() {
  const products = [
    {
      name: "sony hearphone",
      price: 149,
    },
    {
      name: "moto edge 40",
      price: 299,
    },
    {
      name: "boat stone 181",
      price: 129,
    },
  ];

  return (
    <>
      <div className="container" style={{display:"flex", gap:"25px"}}>
        {
          products.map((product,index)=>(
            <div key={index} style={{height:"250px",width:"180px",border:"1px solid black",padding:"30px",boxSizing:"border-box"}}>
              {product.name} <br />
              {product.price} <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
              <button>Add to cart</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App;
