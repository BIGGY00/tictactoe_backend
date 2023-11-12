const sql = require("./db.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const scKey = require("../configs/jwt.config");

const User = function (user) {
  this.id = user.id;
  this.username = user.username;
  this.password = user.password;
};

User.register = (info, result) => {
  sql.query(
    `INSERT INTO users(username, password) VALUES ("${info.username}","${info.password}")`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

User.getUsername = (info, result) => {
  sql.query(
    `SELECT username FROM users WHERE id = ${info.user_id}`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

User.login = (info, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = '${info.username}'`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      if (res.length) {
        const validPassword = bcrypt.compareSync(
          info.password,
          res[0].password
        );
        if (validPassword) {
          const token = jwt.sign({ id: res[0].id }, scKey.secret, {
            noTimestamp: true,
          });
          res[0].accessToken = token;
          result(null, {
            id: res[0].id,
            accessToken: token,
            username: res[0].username,
          });
        } else {
          result({ msg: "invalid_pass" }, null);
          return;
        }
      } else {
        result({ msg: "not_found" }, null);
      }
    }
  );
};

module.exports = User;
