let DestinationSchema = require("../mongooseModel/Destination");
let mongoose = require("mongoose");
let Destination = mongoose.model("Destination", DestinationSchema);
let _ = require("lodash");

module.exports = {
  async saveDestination(data) {
    console.log("saveDestination saveDestination", data);
    let newDestinationData = await new Destination(data).save();
    console.log("newDestinationData newDestinationData", newDestinationData);
    return newDestinationData;
  },
  async getOneDestination(data) {
    try {
      let oneDestinationDetail = await Destination.findOne({
        _id: data.destinationId
      });
      if (_.isEmpty(oneDestinationDetail)) {
        throw { err: "No destination Found" };
      } else {
        return oneDestinationDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllDestination(data) {
    try {
      let allDestinationDetail = await Destination.find({
        status: true
      });
      if (_.isEmpty(allDestinationDetail)) {
        throw { err: "No destination Found" };
      } else {
        return allDestinationDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteDestination(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let deleteDestination = await Destination.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.destinationId),
          status: true
        },
        {
          $set: {
            status: false
          }
        },
        { new: true }
      );
      if (_.isEmpty(deleteDestination)) {
        throw { err: "No Destination Found" };
      } else {
        return deleteDestination;
      }
    } catch (error) {
      throw error;
    }
  }
};
