const express = require("express");
const app = express();
const cors = require("cors");
const Razorpay = require("razorpay");

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "",
    key_secret: ""
});

app.post("/create-order", async (req,res)=>{
  const options = {
    amount : req.body.amount * 100,
    currency : "INR",
    receipt : "order_rcptid_11"
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
});

app.listen(8000, ()=>{
    console.log("server running on port 8000");
})