const express= require("express");
const app= express();
const env = require('dotenv');
const connect = require('./connection/db');
const route = require('./routes/authRoute');
const cors = require('cors');
const course = require('./courseApi/courseRoutes.js/CourseApiRoute')
const PaymentRoute= require('./routes/paymentRoute')
const form=require('./routes/formRoutes')
//configure dot env 
env.config();

//middlewares
app.use(cors({origin:'*'})) 
app.use(express.json());

//Route
app.use('/',route);
app.use('/',PaymentRoute);
app.use('/',course);
app.use('/',form);

//rest API
app.get('/',(req,res)=>{
res.send('<h1>Welcome</h1>')
})

const PORT=process.env.PORT || 8000 ;

app.listen(PORT, async()=>{
    try {
       await connect();
    //    console.log('Connected to Database')
    } catch (error) {
        console.log('Error in Connecting to Port-->index.js',error)
    }
    console.log(`Server is running on Port--> ${process.env.PORT}`);

})
