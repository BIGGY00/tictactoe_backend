const authJWT = require("../middlewares/jwt.auth.middleware");

module.exports = (app) => {
  const user_controller = require("../controllers/user.controller");
  var router = require("express").Router();
  router.post("/register", user_controller.register);
  router.post("/login", user_controller.login);
  router.post("/getname", authJWT, user_controller.getUsername);
  app.use("/user", router);
};
