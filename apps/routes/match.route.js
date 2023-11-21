const authJWT = require("../middlewares/jwt.auth.middleware");

module.exports = (app) => {
  const match_controller = require("../controllers/match.controller");
  var router = require("express").Router();
  router.post("/findmatch", authJWT, match_controller.findMatch);
  router.get("/history", authJWT, match_controller.getHistory);
  router.post("/playwithai", authJWT, match_controller.playWithAi);
  router.get("/info/:id", authJWT, match_controller.getMatchInfo);
  router.post("/setwinner", authJWT, match_controller.setWinner);
  app.use("/match", router);
};
