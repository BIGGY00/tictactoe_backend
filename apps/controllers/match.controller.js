const Match = require("../models/match.model");

const getHistory = (req, res) => {
  const data = {
    user_id: req.id,
  };
  Match.getHistory(data, (err, result) => {
    if (err) {
      res.status(500).send({ fucking: "err" });
    } else {
      res.send(result);
    }
  });
};

const findMatch = (req, res) => {
  Match.findMatch(
    {
      user_id: req.id,
    },
    (err_1, result_1) => {
      if (err_1) {
        res.status(500).send({ fucking: "err" });
        return;
      }
      console.log(result_1);
      if (result_1.length < 1) {
        //No room
        Match.createMatch(
          {
            id: req.id,
          },
          (err_2, result_2) => {
            if (err_2) {
              res.status(500).send({ fucking: "err" });
              return;
            }
            res.send({ status: "make_own_room", room_id: result_2.insertId });
            return;
          }
        );
        return;
      }
      Match.goInMatch(
        {
          user_id: req.id,
          match_id: result_1[0].id,
        },
        (err_2, result_2) => {
          if (err_2) {
            res.status(500).send({ fucking: "err" });
            return;
          }
          res.send({ status: "join_room", room_id: result_1[0].id });
          return;
        }
      );
    }
  );
};

const getMatchInfo = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty.",
    });
  }
  const data = {
    id: req.params.id,
  };
  Match.getMatchInfo(data, (err, result) => {
    if (err) {
      res.status(500).send({ fucking: "err" });
      return;
    }
    res.send(result);
  });
};

const playWithAi = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty.",
    });
  }
  const data = {
    user_id: req.id,
    winner_id: req.body.winner_id,
  };
  Match.playAgainstAI(data, (err, result) => {
    if (err) {
      res.status(500).send({ fucking: "err" });
      return;
    }
    res.send({ status: "success" });
  });
};

const setWinner = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty.",
    });
  }
  const data = {
    match_id: req.body.match_id,
    user_id: req.body.user_id,
  };
  Match.setWinner(data, (err, result) => {
    if (err) {
      res.status(500).send({ fucking: "err" });
      return;
    }
    res.send({ status: "success" });
  });
};

module.exports = {
  findMatch,
  getHistory,
  playWithAi,
  getMatchInfo,
  setWinner,
};
