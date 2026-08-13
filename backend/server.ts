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
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

app.get('/', (req: string, res: any) => {
    res.send("Razorpay backend is running");
});
app.post('/create-order', async (req: any,res: any) => {
    try {
        const {amount} = req.body;

        const options = {
            amount: amount * 100, //500 -> 50000 paise
            currency: "INR",
            receipt:`receipt_${Date.now()}`
        }
        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            order,
            key_id: process.env.RAZORPAY_KEY_ID
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create order"
        })
    }
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})