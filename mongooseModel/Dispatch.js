let mongoose = require("mongoose");
var Schema = mongoose.Schema;

let dispatchSchema = new Schema(
  {
    deliveryNumber: {
      type: Number,
      unique: true,
      index: true,
      require: true
    },
    shipmentNumber: {
      type: Number
    },
    sourceCode: {
      type: Schema.Types.ObjectId,
      ref: "Source",
      index: true,
      require: true
    },
    destinationCode: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      index: true,
      require: true
    },
    vehicleNumber: {
      type: String,
      require: true
    },
    transporterCode: {
      type: Schema.Types.ObjectId,
      ref: "Transporter",
      index: true,
      require: true
    },
    driverName: {
      type: String
    },
    driverMobileNumber: {
      type: Number
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      require: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      require: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    isDeleted: {
      type: Boolean,
      enum: [true, false],
      default: false
    }
  },
  { timestamps: true }
);

module.exports = dispatchSchema;
