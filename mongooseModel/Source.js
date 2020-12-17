let mongoose = require("mongoose");
var Schema = mongoose.Schema;

let sourceSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true
    },
    name: String,
    address: {
      type: String
    }
  },
  { timestamps: true }
);
sourceSchema.index({ code: 1 });
module.exports = sourceSchema;
