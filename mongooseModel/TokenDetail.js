let mongoose = require("mongoose");
var Schema = mongoose.Schema;

let tokenDetailSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    tokenCreated: {
      type: String
    },
    tokenExpired: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = tokenDetailSchema;
