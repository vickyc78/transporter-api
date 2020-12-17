let DispatchSchema = require("../mongooseModel/Dispatch");
let SourceSchema = require("../mongooseModel/Source");
let DestinationSchema = require("../mongooseModel/Destination");
let TransporterSchema = require("../mongooseModel/Transporter");
let mongoose = require("mongoose");
let Dispatch = mongoose.model("Dispatch", DispatchSchema);
let Source = mongoose.model("Source", SourceSchema);
let Destination = mongoose.model("Destination", DestinationSchema);
let Transporter = mongoose.model("Transporter", TransporterSchema);
let _ = require("lodash");
const shortId = require("shortid");
var voucherCodes = require("voucher-code-generator");
let moment = require("moment");
var json2xls = require("json2xls");
let fs = require("fs");

module.exports = {
  async saveDispatch(data) {
    console.log("saveDispatch saveDispatch", data);
    if (
      data &&
      data.sourceCode &&
      data.destinationCode &&
      data.transporterCode &&
      data.vehicleNumber
    ) {
      if (data.startDate > data.endDate) {
        throw {
          message: "Start date can not greater then end date"
        };
      }
      data.deliveryNumber = voucherCodes.generate({
        length: 6,
        count: 1,
        charset: "0123456789"
      })[0];
      console.log("JJJJJJJJJJJ", data);
      let sourceData = await Source.findOne({
        _id: data.sourceCode,
        status: true
      });
      if (!sourceData) {
        throw {
          message: "Please Provide valid source code"
        };
      }
      let destinationData = await Destination.findOne({
        _id: data.destinationCode,
        status: true
      });
      if (!destinationData) {
        throw {
          message: "Please Provide valid destination code"
        };
      }
      let transporterData = await Transporter.findOne({
        _id: data.transporterCode,
        status: true
      });
      if (!transporterData) {
        throw {
          message: "Please Provide valid transporter code"
        };
      }
      let newDispatchData = await new Dispatch(data).save();
      console.log("newDispatchData newDispatchData", newDispatchData);
      return newDispatchData;
    } else {
      throw {
        message: "Please Provide required fields"
      };
    }
  },
  async getOneDispatch(data) {
    try {
      let dispatchDetail = await Dispatch.findOne({
        _id: mongoose.Types.ObjectId(data.dispatchId)
      });
      if (_.isEmpty(dispatchDetail)) {
        throw { err: "No Dispatch Found" };
      } else {
        return dispatchDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllDispatch(data) {
    try {
      console.log("getAllDispatch getAllDispatch", data);
      let limit = 10,
        obj = {},
        page = data.page ? data.page : 1,
        filter = {},
        skip = (page - 1) * limit;

      if (data.keyword) {
        console.log("inside if");
        filter = {
          $or: [
            {
              "sourceData.code": {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              "destinationData.code": {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              vehicleNumber: {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              "transporterData.code": {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              driverName: {
                $regex: data.keyword,
                $options: "i"
              }
            }
          ]
        };
      } else {
        console.log("inside else");
        filter = {};
      }
      let allDispatchData = await Dispatch.aggregate([
        {
          $match: {}
        },
        {
          $lookup: {
            from: "sources",
            localField: "sourceCode",
            foreignField: "_id",
            as: "sourceData"
          }
        },
        {
          $unwind: {
            path: "$sourceData"
          }
        },
        {
          $lookup: {
            from: "destinations",
            localField: "destinationCode",
            foreignField: "_id",
            as: "destinationData"
          }
        },
        {
          $unwind: {
            path: "$destinationData"
          }
        },
        {
          $lookup: {
            from: "transporters",
            localField: "transporterCode",
            foreignField: "_id",
            as: "transporterData"
          }
        },
        {
          $unwind: {
            path: "$transporterData"
          }
        },
        { $match: filter },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $facet: {
            paginatedResult: [
              {
                $skip: page * limit - limit
              },
              {
                $limit: limit
              }
            ],
            totalCount: [
              {
                $count: "count"
              }
            ]
          }
        }
      ]);

      return {
        results: allDispatchData[0].paginatedResult,
        total: allDispatchData[0].totalCount[0].count
      };
    } catch (error) {
      throw error;
    }
  },
  async generateDispatchExcel(data) {
    try {
      console.log("getAllDispatch getAllDispatch", data);
      let limit = 10,
        obj = {},
        page = data.page ? data.page : 1,
        filter = {},
        skip = (page - 1) * limit;

      if (data.keyword) {
        console.log("inside if");
        filter = {
          $or: [
            {
              "sourceData.code": {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              "destinationData.code": {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              vehicleNumber: {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              "transporterData.code": {
                $regex: data.keyword,
                $options: "i"
              }
            },
            {
              driverName: {
                $regex: data.keyword,
                $options: "i"
              }
            }
          ]
        };
      } else {
        console.log("inside else");
        filter = {};
      }
      let allDispatchData = await Dispatch.aggregate([
        {
          $match: {}
        },
        {
          $lookup: {
            from: "sources",
            localField: "sourceCode",
            foreignField: "_id",
            as: "sourceData"
          }
        },
        {
          $unwind: {
            path: "$sourceData"
          }
        },
        {
          $lookup: {
            from: "destinations",
            localField: "destinationCode",
            foreignField: "_id",
            as: "destinationData"
          }
        },
        {
          $unwind: {
            path: "$destinationData"
          }
        },
        {
          $lookup: {
            from: "transporters",
            localField: "transporterCode",
            foreignField: "_id",
            as: "transporterData"
          }
        },
        {
          $unwind: {
            path: "$transporterData"
          }
        },
        { $match: filter },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $facet: {
            paginatedResult: [
              {
                $skip: page * limit - limit
              },
              {
                $limit: limit
              }
            ],
            totalCount: [
              {
                $count: "count"
              }
            ]
          }
        }
      ]);

      var fields = {
        deliveryNumber: "string",
        shipmentNumber: "string",
        sourceCode: "string",
        destinationCode: "string",
        vehicleNumber: "string",
        transporterCode: "string",
        driverName: "string",
        startDate: "string",
        endDate: "string"
      };
      var excelArray = [];
      _.each(allDispatchData[0].paginatedResult, x => {
        var obj = {};
        obj["deliveryNumber"] = x.deliveryNumber;
        obj["shipmentNumber"] = x.shipmentNumber;
        obj["sourceCode"] = x.sourceData.code;
        obj["destinationCode"] = x.destinationData.code;
        obj["vehicleNumber"] = x.vehicleNumber;
        obj["transporterCode"] = x.transporterData.code;
        obj["driverName"] = x.driverName;
        obj["startDate"] = moment(x.startDate).format("DD-MM-YYYY_hh:mm A");
        obj["endDate"] = moment(x.endDate).format("DD-MM-YYYY_hh:mm A");
        excelArray.push(obj);
      });
      console.log("excelArray", excelArray);
      var xls = json2xls(excelArray, { fields });
      console.log("xls", xls);
      var excelName = "./DispatchReport.xlsx";
      fs.writeFileSync(excelName, xls, "binary");
      var path = excelName;
      var excel = fs.readFileSync(excelName);

      return { path, excel };
    } catch (error) {
      throw error;
    }
  },
  async deleteDispatch(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let dispatchDetail = await Dispatch.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.dispatchId),
          isDeleted: false
        },
        {
          $set: {
            isDeleted: true
          }
        },
        { new: true }
      );
      console.log("dispatchDetail dispatchDetail", dispatchDetail);
      if (_.isEmpty(dispatchDetail) || !dispatchDetail.nModified) {
        throw { err: "No Dispatch Found" };
      } else {
        return dispatchDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async updateDispatch(data) {
    try {
      let updateDispatchDetail = await Dispatch.updateOne(
        {
          _id: mongoose.Types.ObjectId(data._id)
        },
        data,
        { new: true }
      );
      console.log(
        "updateDispatchDetail updateDispatchDetail",
        updateDispatchDetail
      );
      if (_.isEmpty(updateDispatchDetail) || !updateDispatchDetail.nModified) {
        throw { err: "No Dispatch Found" };
      } else {
        return updateDispatchDetail;
      }
    } catch (error) {
      throw error;
    }
  }
};
