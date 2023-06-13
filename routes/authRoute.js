const express = require('express');
const {resgisterController, loginController, testController} = require('../controller/authController');
const { signInMiddleware } = require("../middleware/userMiddleware")

//Router Object
const router=express.Router();

//Routes
router.post('/signup',resgisterController);
router.post('/login',loginController);
router.get('/test',signInMiddleware,testController)

module.exports=router; 