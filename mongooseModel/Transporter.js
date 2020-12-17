let mongoose = require("mongoose");
var Schema = mongoose.Schema;

let transporterSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      require: true,
      index: true
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true
    },
    name: String,
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   index: true,
    //   require: true
    // },
    address: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = transporterSchema;
