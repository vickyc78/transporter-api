let SourceModel = require("../models/SourceModel");

module.exports = router => {
  router.post("/saveSource", async (req, res, next) => {
    try {
      let saveSourceData = await SourceModel.saveSource(req.body);
      console.log("saveSourceData saveSourceData", saveSourceData);
      res.status(200).json(saveSourceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/getOneSource/:sourceId", async (req, res, next) => {
    try {
      let oneSourceData = await SourceModel.getOneSource(req.params);
      res.status(200).json(oneSourceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/getAllSource", async (req, res, next) => {
    try {
      let allSourceData = await SourceModel.getAllSource(req.body);
      res.status(200).json(allSourceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/deleteSource", async (req, res, next) => {
    try {
      console.log("deleteSource deleteSource");
      let deleteSourceData = await SourceModel.deleteSource(req.body);
      res.status(200).json(deleteSourceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
