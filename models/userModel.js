const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      createIndexes: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be 8 digits long"],
    },
    status: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
