const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Razorpay = require('razorpay');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Initialize Razorpay client instance with keys
const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    secret_id:process.env.RAZORPAY_KEY_SECRET
})

app.get('/', (req: string, res: any) => {
    res.send("Razorpay backend is running");
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})