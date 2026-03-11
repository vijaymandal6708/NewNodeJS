import express from "express";
import cors from "cors";
import Razorpay from "razorpay";

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_SPo6d8iEYKD89U",
  key_secret: "o15lCItRby266n0M0FW85JIA"
});

app.post("/create-order", async (req,res)=>{
  const options = {
    amount : req.body.amount * 100,
    currency : "INR",
    receipt : "order_rcptid_11"
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});