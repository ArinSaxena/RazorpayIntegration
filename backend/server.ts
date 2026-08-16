const express = require('express');
const cors = require('cors');
const cryptoModule = require('crypto');
const mongoosee = require('mongoose');
require('dotenv').config();
const Payment = require('./models/Payment.ts');

const Razorpay = require('razorpay');

const app = express();
const port = 5000;
app.use(cors());

app.use('/webhook',express.raw({type:'application/json'}), (req: any, res: any) => {
    try{
        console.log("haallo")
        const receivedSignature = req.headers['x-razorpay-signature'];
        const expectedSignature = cryptoModule
        .createHmac('sha256',process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(req.body)
        .digest('hex');

        if(expectedSignature !== receivedSignature) {
            return res.status(400).json({
                success: false,
                message:"Invalid webhook signature",
            })
        }
        console.log('✅ Webhook signature verified');
        const event = JSON.parse(req.body.toString());
        console.log('Webhook event:', event.event);

      return res.status(200).json({
        success: true,
      });
    }catch(error){
        console.log("cadfadf",error)
     return res.status(200).json({
        success:true,
    })
}
}
)

app.use(express.json());

// Initialize Razorpay client instance with keys
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

mongoosee.connect(process.env.MONGO_URI).then(() => {
   console.log("MongoDB connected");
}).catch((error: string)=>{
    console.log("MognoDB connection failed: ",error);
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
        console.log("Optionsss",options)
        const order = await razorpay.orders.create(options);
        console.log("414141",order)
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

app.post('/verify-payment', async (req:any, res: any) => {

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
            // console.log("6868",JSON.stringify(req))
                        console.log("6868",req.body)

            if(expectedSignature ===  razorpay_signature) {
                const payment = await Payment.create({
                    user: req.body.user,
                    razorpayOrderId: razorpay_order_id,
                    razorpayPaymentId: razorpay_payment_id,
                    amount: req.body.amount,
                    status: 'success'
                })
                return res.json({
                    success: true,
                    message:'Payment verified Successfully',
                    payment
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