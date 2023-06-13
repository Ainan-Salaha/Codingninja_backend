const  express = require('express')
const router= express.Router();
const {braintreeTokenController, braintreePaymentController} = require('../controller/paymentController')
//payment route
//token
router.get('/braintree/token',braintreeTokenController)

//payments

// router.post('/braintree/payment', requireSignIn,braintreePaymentController)
router.post('/braintree/payment',braintreePaymentController)

module.exports= router