const bcrypt = require("bcrypt"); // for storing hash password in the database

const matchPassword = async (enteredpassword, oldPassword) => {
  return await bcrypt.compare(enteredpassword, oldPassword);
};

module.exports = matchPassword;
