const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty.",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const userObj = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
  };
  User.register(userObj, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send({ message: "Success!" });
  });
};

const getUsername = (req, res) => {
  User.getUsername({ user_id: req.body.user_id }, (err, result) => {
    if (err) {
      res.status(401).send({
        message: "Not found ",
      });
      return;
    }
    res.send(result[0]);
  });
};

const login = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty.",
    });
  }
  const userObj = {
    username: req.body.username,
    password: req.body.password,
  };
  User.login(userObj, (err, result) => {
    if (err) {
      if (err.msg == "not_found") {
        res.status(401).send({
          message: "Not found ",
        });
        return;
      } else {
        res.status(500).send({ dunno: "bro some error!" });
        return;
      }
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  login,
  register,
  getUsername,
};
