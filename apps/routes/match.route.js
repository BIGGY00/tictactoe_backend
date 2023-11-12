const authJWT = require("../middlewares/jwt.auth.middleware");

module.exports = (app) => {
  const match_controller = require("../controllers/match.controller");
  var router = require("express").Router();
  router.post("/findmatch", authJWT, match_controller.findMatch);
  router.get("/history", authJWT, match_controller.getHistory);
  router.post("/playwithai", authJWT, match_controller.playWithAi);
  app.use("/match", router);
};
