const braintree = require('braintree')
const env=require('dotenv')

env.config();

//payment gateway

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).json({ 'message': err })
            } else {
                res.status(200).json(response)
            }
        })
    } catch (error) {
        console.log(`PaymentController__braintreeTokenController -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }

}

//payment
const braintreePaymentController = async (req, res) => {
    try {
        const {order, nonce}=req.body;
        let total = 0;
        order.map(i=>{ 
          total+=i.price;
        });
        let newTranscation= gateway.transaction.sale({
          amount:total,
          paymentMethodNonce:nonce,
          options:{
            submitForSettlement:true
          },      
        },
        function(error,result){
          if(result){
            console.log("Processing Payment");
          }
          else{
            res.status(500).send(error)
          }

        })

    } catch (error) {
        console.log(`PaymentController__braintreePaymentController -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }
}


module.exports = {
     braintreeTokenController,
    braintreePaymentController
}