let DispatchModel = require("../models/DispatchModel");
const excel = require("exceljs");

module.exports = router => {
  router.post("/saveDispatch", async (req, res, next) => {
    try {
      console.log("saveDispatch saveDispatch", req.user);
      req.body.createdBy = req.user._id;
      let saveDispatchData = await DispatchModel.saveDispatch(req.body);
      console.log("saveDispatchData saveDispatchData", saveDispatchData);
      res.status(200).json(saveDispatchData);
    } catch (err) {
      console.log("ERRRRRRRRRRr", err);
      res.status(500).json(err);
    }
  });

  router.get("/getOneDispatch/:dispatchId", async (req, res, next) => {
    try {
      let oneDispatchData = await DispatchModel.getOneDispatch(req.params);
      res.status(200).json(oneDispatchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.post("/getAllDispatch", async (req, res, next) => {
    try {
      console.log("getAllDispatch getAllDispatch");
      let allDispatchData = await DispatchModel.getAllDispatch(req.body);

      res.status(200).json(allDispatchData);
    } catch (err) {
      console.log("HHHHHHHHH", err);
      res.status(500).json(err);
    }
  });

  router.post("/generateDispatchExcel", async (req, res) => {
    try {
      const data = await DispatchModel.generateDispatchExcel(req.body);
      res.set("Content-Type", "application/octet-stream");
      res.set("Content-Disposition", "attachment;filename=" + data.path);
      res.send(data.excel);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  // router.post("/getAllDispatch", async (req, res, next) => {
  //   try {
  //     console.log("getAllDispatch getAllDispatch");
  //     let tempData = await DispatchModel.getAllDispatch(req.body);
  //     let tutorials = [];

  //     tempData.forEach(singleObj => {
  //       tutorials.push({
  //         id: singleObj._id,
  //         title: singleObj.deliveryNumber
  //       });
  //     });

  //     let workbook = new excel.Workbook();
  //     let worksheet = workbook.addWorksheet("Tutorials");
  //     worksheet.columns = [
  //       { header: "Id", key: "id", width: 5 },
  //       { header: "shortNumber", key: "title", width: 25 }
  //     ];
  //     worksheet.addRows(tutorials);
  //     res.setHeader(
  //       "Content-Type",
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     );
  //     res.setHeader(
  //       "Content-Disposition",
  //       "attachment; filename=" + "tutorials.xlsx"
  //     );

  //     return workbook.xlsx.write(res).then(function() {
  //       res.status(200).end();
  //     });
  //     // res.status(200).json(allDispatchData);
  //   } catch (err) {
  //     console.log("HHHHHHHHH", err);
  //     res.status(500).json(err);
  //   }
  // });

  router.post("/deleteDispatch", async (req, res, next) => {
    try {
      console.log("deleteDispatch deleteDispatch");
      let deleteDispatchData = await DispatchModel.deleteDispatch(req.body);
      res.status(200).json(deleteDispatchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.post("/updateDispatch", async (req, res, next) => {
    try {
      console.log("updateDispatch updateDispatch");
      let updateDispatchData = await DispatchModel.updateDispatch(req.body);
      res.status(200).json(updateDispatchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
