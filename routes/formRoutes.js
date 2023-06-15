const express = require('express');
const {formController,formCollegedata,formCompanydata} = require('../controller/formConroller')
const router=express.Router();

router.post('/form',formController)
router.post('/formcollege',formCollegedata)
router.post('/formcompany',formCompanydata)
module.exports=router; 