let TransporterModel = require("../models/TransporterModel");

module.exports = router => {
  router.post("/saveTransporter", async (req, res, next) => {
    try {
      let saveTransporterData = await TransporterModel.saveTransporter(
        req.body
      );
      console.log(
        "saveTransporterData saveTransporterData",
        saveTransporterData
      );
      res.status(200).json(saveTransporterData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/getOneTransporter/:transporterId", async (req, res, next) => {
    try {
      let oneTransporterData = await TransporterModel.getOneTransporter(
        req.params
      );
      res.status(200).json(oneTransporterData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/getAllTransporter", async (req, res, next) => {
    try {
      let allTransporterData = await TransporterModel.getAllTransporter(
        req.body
      );
      res.status(200).json(allTransporterData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/deleteTransporter", async (req, res, next) => {
    try {
      console.log("deleteTransporter deleteTransporter");
      let deleteTransporterData = await TransporterModel.deleteTransporter(
        req.body
      );
      res.status(200).json(deleteTransporterData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
