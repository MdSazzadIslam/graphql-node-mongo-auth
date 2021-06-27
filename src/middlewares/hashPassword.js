const bcrypt = require("bcrypt"); // for storing hash password in the database

const hashPassword = async (enteredpassword, saltRounds) => {
  return await bcrypt.hash(enteredpassword, saltRounds);
};

module.exports = hashPassword;
