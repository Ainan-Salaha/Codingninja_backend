const mongoose=require("mongoose");

const fSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },    
    lastName:{
        type:String,
        required:true
    },    
    address:{
        type:String,
        required:true
    },    
    phone:{
        type:Number,
        required:true
    },  
    collegeName:{
        type:String,
        required:true
    },  
    college_city:{
        type:String,
        required:true
    },
    college_state:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    yrs_of_exp:{
        type:String,
        required:true
    },
    company_city:{
        type:String,
        required:true
    },
    company_state:{
        type:String,
        required:true
    },
    

})

const formSchema = mongoose.model('form',fSchema);
module.exports={formSchema};