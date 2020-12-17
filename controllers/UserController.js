let UserModel = require("../models/UserModel");

module.exports = function(router) {
  router.post("/createUser", async (req, res, next) => {
    let registerData = await UserModel.saveUser(req.body);
    console.log("registerData registerData", registerData);
    if (registerData && registerData == "User name taken") {
      res.status(400).send({ error: "User name taken" });
    } else if (registerData && registerData == "Failed to save User") {
      res.status(500).send({ error: "Failed to save User" });
    } else if (registerData && registerData._id) {
      res.status(200).json(registerData);
    } else {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });

  router.post("/loginUser", async (req, res, next) => {
    let loginData = await UserModel.loginUser(req.body);
    console.log("loginData", loginData);
    if (loginData && loginData == "No User Found") {
      res.status(400).send({ error: "No User Found" });
    } else if (loginData && loginData == "Invalid password!") {
      res.status(401).json({ error: "Invalid password!" });
    } else if (loginData && loginData._id) {
      res.status(200).json(loginData);
    } else {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
  router.put("/logOutUser", async (req, res, next) => {
    let logOutData = await UserModel.logOutUser(req.headers);
    console.log("logOutData", logOutData);
    if (loginData && loginData == "No User Found") {
      res.status(400).send({ error: "No User Found" });
    } else if (loginData && loginData == "Invalid password!") {
      res.status(401).json({ error: "Invalid password!" });
    } else if (loginData && loginData._id) {
      res.status(200).json(loginData);
    } else {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
};
