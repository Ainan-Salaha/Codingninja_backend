const { formSchema } = require("../models/formData");

const formController = async (req, res) => {
  try {
    const { firstName, lastName, address, phone } = req.body;
    if (!firstName) {
      return res.send({ message: "First Name is Required" });
    }
    if (!lastName) {
      return res.send({ message: "Last Name is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is Required" });
    }

    const formData = await formSchema.insertMany(req.body);
    res.status(201).send({
      success: true,
      message: "User details saved Successfully",
      formData,
    });
  } catch (error) {
    console.log(`formController  ->  ${error}`);
  }
};
const formCollegedata = async (req, res) => {
  try {
    const { collegeName, college_city, college_state } = req.body;
    if (!collegeName) {
      return res.send({ message: "College Name is Required" });
    }
    if (!college_city) {
      return res.send({ message: "City is Required" });
    }
    if (!college_state) {
      return res.send({ message: "State is Required" });
    }
    const formData = await formSchema.insertMany(req.body);
    res.status(201).send({
      success: true,
      message: "User details saved Successfully",
      formData,
    });
  } catch (error) {
    console.log(`formController_formCollegedata  ->  ${error}`);
  }
};

const formCompanydata = async (req, res) => {
  try {
    const { companyName, yrs_of_exp, company_city, company_state } = req.body;
    if (!companyName) {
      return res.send({ message: "Company Name is Required" });
    }
    if (!yrs_of_exp) {
      return res.send({ message: "please fill the respected feild" });
    }
    if (!company_city) {
      return res.send({ message: "City is Required" });
    }
    if (!company_state) {
      return res.send({ message: "State is Required" });
    }
    const formData = await formSchema.insertMany(req.body);
    res.status(201).send({
      success: true,
      message: "User details saved Successfully",
      formData,
    });
  } catch (error) {
    console.log(`formController_formCollegedata  ->  ${error}`);
  }
};

module.exports = { formController, formCollegedata ,formCompanydata};
