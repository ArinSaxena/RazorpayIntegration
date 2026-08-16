const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     index: true
    // },
    razorpayOrderId: {
        type: 'string',
        required: true,
        unique: true
    },
    razorpayPaymentId:{
        type: 'string',
        required: false,
        unique: true
    },
    amount:{
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        enum: ['created', 'success', 'failed'],
        default: 'created'
    }
}, {timestamps: true},
)

module.exports = mongoose.model('Payment', PaymentSchema);