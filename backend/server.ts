const express = require('express');
const cors = require('cors');
const cryptoModule = require('crypto');
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

app.post('/verify-payment', (req:any, res: any) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature } = req.body;

            const body = razorpay_order_id + '|' + razorpay_payment_id;

            const expectedSignature = cryptoModule
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

            if(expectedSignature ===  razorpay_signature) {
                return res.json({
                    success: true,
                    message:'Payment verified Successfully'
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
    } catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:'Verification error'
        })
    }
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})