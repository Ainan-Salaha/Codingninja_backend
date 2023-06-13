const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connnected to db");
  } catch (error) {
    console.log(`db.js->${error}`);
  }
};

module.exports = connect;
