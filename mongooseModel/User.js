let mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
let userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    password: {
      type: String
    },
    accessToken: {
      type: String
    }
  },
  { timestamps: true }
);
console.log("userSchema userSchema", userSchema);
userSchema.pre("save", async function(next) {
  try {
    console.log("this.password this.password", this.password);
    let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
    let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
  return next();
});
module.exports = userSchema;
