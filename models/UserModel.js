let userSchema = require("../mongooseModel/User");
let mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//Register Schema to User
const User = mongoose.model("User", userSchema);
const tokenDetailSchema = require("../mongooseModel/TokenDetail");
const TokenDetail = mongoose.model("TokenDetail", tokenDetailSchema);
module.exports = {
  saveUser: async data => {
    console.log("saveUser saveUser", data);
    try {
      //check if username is already taken:
      let user = await User.findOne({ userName: data.userName });
      if (user) {
        return "User name taken";
      } else {
        //create new user and generate a pair of tokens and send
        data.accessToken = jwt.sign(
          {
            userName: data.userName
          },
          "secret",
          {
            expiresIn: "1d"
          }
        );
        user = await new User(data).save();
        if (user && user._id) {
          let newTokenDetail = new TokenDetail({
            userId: user._id,
            tokenCreated: user.accessToken
          });
          let tokenDetailData = await newTokenDetail.save();
          return user;
        } else {
          throw {
            message: "Failed to save User"
          };
        }
      }
    } catch (error) {
      console.error(error);
      throw { message: error };
    }
  },

  loginUser: async data => {
    try {
      let user = await User.findOne({ userName: data.userName });
      //send error if no user found:
      if (!user) {
        return "No User Found";
      } else {
        //check if password is valid:
        let valid = await bcrypt.compare(data.password, user.password);
        console.log("valid valid", valid);
        if (valid) {
          //generate a pair of tokens if valid and send
          data.accessToken = jwt.sign(
            {
              userName: data.userName
            },
            "secret",
            {
              expiresIn: "1d"
            }
          );
          let updateData = await User.updateOne(
            {
              userName: data.userName
            },
            {
              $set: {
                accessToken: data.accessToken
              }
            },
            {
              new: true
            }
          );
          console.log("updateData updateData", updateData);
          if (updateData && updateData.nModified) {
            let newTokenDetail = new TokenDetail({
              userId: user._id,
              tokenCreated: data.accessToken,
              tokenExpired: user.accessToken
            });
            let tokenDetailData = await newTokenDetail.save();
            return tokenDetailData;
          }
        } else {
          //send error if password is invalid
          return "Invalid password!";
        }
      }
    } catch (error) {
      throw { message: error };
    }
  },

  logOutUser: async data => {
    let user = await User.updateOne(
      {
        accessToken: data.accesstoken
      },
      {
        $set: {
          accessToken: ""
        }
      },
      {
        new: true
      }
    );
    console.log("user user", user);
    if (user && user.nModified) {
      return "logged out!";
    } else {
      throw {
        message: "Internal Server Error!"
      };
    }
  }
};

// module.exports = user;
