let SourceSchema = require("../mongooseModel/Source");
let mongoose = require("mongoose");
let Source = mongoose.model("Source", SourceSchema);
let _ = require("lodash");

module.exports = {
  async saveSource(data) {
    console.log("saveSource saveSource", data);
    let newSourceData = await new Source(data).save();
    console.log("newSourceData newSourceData", newSourceData);
    return newSourceData;
  },
  async getOneSource(data) {
    try {
      let oneSourceDetail = await Source.findOne({
        _id: data.sourceId
      });
      if (_.isEmpty(oneSourceDetail)) {
        throw { err: "No Source Found" };
      } else {
        return oneSourceDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllSource(data) {
    try {
      let allSourceDetail = await Source.find({
        status: true
      });
      if (_.isEmpty(allSourceDetail)) {
        throw { err: "No Source Found" };
      } else {
        return allSourceDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteSource(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let deleteSource = await Source.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.sourceId),
          status: true
        },
        {
          $set: {
            status: false
          }
        },
        { new: true }
      );
      if (_.isEmpty(deleteSource)) {
        throw { err: "No Source Found" };
      } else {
        return deleteSource;
      }
    } catch (error) {
      throw error;
    }
  }
};
