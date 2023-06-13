const { hashedPassword, comparePassword } = require('../hashing/authHash');
const {userSchema} = require('../models/userModel');
const jwt = require('jsonwebtoken');

const resgisterController=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        //check if fields are provided or not
        if(!name){
            return res.send({message:'Name is Required'});
        }
        if(!email){
            return res.send({message:'Email is Required'});
        }
        if(!password){
            return res.send({message:'Password is Required'});
        }

        //check if user exist
        const userExist=await userSchema.findOne({email});

        //if user exists then
        if(userExist){
        return res.status(404).send({
            success:false,
            message:'User Already Exists...Please Login '
        });
        }

        //if user is not registered then registering the user

        //hashing the password before saving in database
        const hashPassword=await hashedPassword(password);

        // saving user details

        const user=await new userSchema({
            name, 
            email,
            password:hashPassword
        }).save();
        res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(`UserController__Signup  ->  ${error}`)
    }
}

const loginController=async(req,res)=>{
try {
    const{email,password}=req.body;

    //checking if input fields are Empty
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:'Invalid Email or Password'
        });
    }

            //checking if user is registered or not
            const user=await userSchema.findOne({email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'User is not registered. Try to register first'
                });
            }

            //if user is registered then compare the password
            const match=await comparePassword(password,user.password);
            if(!match){
                res.status(200).send({
                    success:false,
                    message:'Invalid Password',
                    entered_password:password,
                    user_password:user.password
                });
            }

            //if password is matched then generating token
            const token =await jwt.sign({_id:user._id}, process.env.Secret_Key, {expiresIn:"3d"});
            res.status(200).send({
                success:true,
                message:'Login Successfully',
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                },
                token,
            });
} catch (error) {
    console.log(`UserController__Login  ->  ${error}`)
    res.status(500).send({
        success:false,
        message:'Error in Login',
        error
    });
}
}

const testController=(req,res)=>{
    try {
        res.send('Protected Route')
    } catch (error) {
        res.send('Error');
    }
}

module.exports={resgisterController,loginController,testController}