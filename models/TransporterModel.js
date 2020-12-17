let TransporterSchema = require("../mongooseModel/Transporter");
let mongoose = require("mongoose");
let Transporter = mongoose.model("Transporter", TransporterSchema);
let _ = require("lodash");

module.exports = {
  async saveTransporter(data) {
    console.log("saveTransporter saveTransporter", data);
    let newTransporterData = await new Transporter(data).save();
    console.log("newTransporterData newTransporterData", newTransporterData);
    return newTransporterData;
  },
  async getOneTransporter(data) {
    try {
      let getOneTransporterDetail = await Transporter.findOne({
        _id: data.transporterId
      });
      if (_.isEmpty(getOneTransporterDetail)) {
        throw { err: "No Transporter Found" };
      } else {
        return getOneTransporterDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllTransporter(data) {
    try {
      let allTransporterDetail = await Transporter.find({
        status: true
      });
      if (_.isEmpty(allTransporterDetail)) {
        throw { err: "No Transporter Found" };
      } else {
        return allTransporterDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteTransporter(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let deleteTransporter = await Transporter.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.transporterId),
          status: true
        },
        {
          $set: {
            status: false
          }
        },
        { new: true }
      );
      console.log("deleteTransporter deleteTransporter", deleteTransporter);
      if (_.isEmpty(deleteTransporter)) {
        throw { err: "No Transporter Found" };
      } else {
        return deleteTransporter;
      }
    } catch (error) {
      throw error;
    }
  }
};
