let express = require("express");

let mongoose = require("mongoose");

let bodyParser = require("body-parser");

let cors = require("cors");

var jwt = require("jsonwebtoken");

let Schema = mongoose.Schema;

let router = express.Router();

let app = express();

var env = require("./config/env/development");

mongoose.connect(env.dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || env.port;
app.listen(port, function() {
  console.log(`App listing on port ${port} !`);
});

let userRoutes = require("./controllers/UserController");
let sourceRoutes = require("./controllers/SourceController");
let destinationRoutes = require("./controllers/DestinationController");
let transporterRoutes = require("./controllers/TransporterController");
let dispatchRoutes = require("./controllers/DispatchController");

app.use("/User", router);
app.use("/Source", router);
app.use("/Destination", router);
app.use("/Transporter", router);
app.use("/Dispatch", router);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});
let userSchema = require("./mongooseModel/User");
const User = mongoose.model("User", userSchema);
let nonSecurePaths = ["/User/createUser", "/User/loginUser"];
router.use(async (req, res, next) => {
  console.log("reqqq", req.path);
  // let tempData = 0;
  let tempData = nonSecurePaths.includes(req.originalUrl);
  // console.log("tempData tempData", tempData);
  if (tempData) {
    next();
  } else {
    if (req.headers.accesstoken) {
      try {
        console.log("inside if");
        const payload = jwt.verify(req.headers.accesstoken, "secret");
        console.log("payload payload", payload);
        if (payload && payload.userName) {
          req.user = await User.findOne({
            accessToken: req.headers.accesstoken
          });
          console.log("req.user  req.user ", req.user);
          if (req.user) {
            req.body.updatedBy = req.user._id;
            next();
          } else {
            res
              .status(401)
              .json({ error: "Invalid token,please login again!" });
          }
        }
      } catch (error) {
        console.log("error error", error);
        if (error.name === "TokenExpiredError") {
          res
            .status(401)
            .json({ error: "Session timed out,please login again" });
        } else if (error.name === "JsonWebTokenError") {
          res.status(401).json({ error: "Invalid token,please login again!" });
        } else {
          //catch other unprecedented errors
          console.error(error);
          res.status(400).json({ error });
        }
      }

      // let userFound = await User.findOne({
      //   accessToken: req.headers.accesstoken
      // });
      // if (userFound && userFound._id) {
      //   next();
      // } else {
      //   res.status(401).json("Not Authorized");
      // }
    } else {
      res.status(401).json({ error: "Access denied, token missing!" });
    }
  }
});

userRoutes(router);
sourceRoutes(router);
destinationRoutes(router);
transporterRoutes(router);
dispatchRoutes(router);
