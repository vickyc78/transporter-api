let DestinationModel = require("../models/DestinationModel");

module.exports = router => {
  router.post("/saveDestination", async (req, res, next) => {
    try {
      let saveDestinationData = await DestinationModel.saveDestination(
        req.body
      );
      console.log(
        "saveDestinationData saveDestinationData",
        saveDestinationData
      );
      res.status(200).json(saveDestinationData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/getOneDestination/:destinationId", async (req, res, next) => {
    try {
      let oneDestinationData = await DestinationModel.getOneDestination(
        req.params
      );
      res.status(200).json(oneDestinationData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/getAllDestination", async (req, res, next) => {
    try {
      let allDestinationData = await DestinationModel.getAllDestination(
        req.body
      );
      res.status(200).json(allDestinationData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/deleteDestination", async (req, res, next) => {
    try {
      console.log("deleteDestination deleteDestination");
      let deleteDestinationData = await DestinationModel.deleteDestination(
        req.body
      );
      res.status(200).json(deleteDestinationData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
