const sql = require("./db.model");

const Match = function (match) {
  this.id = match.id;
  this.player_one_id = match.player_one_id;
  this.player_two_id = match.player_two_id;
  this.is_waiting = match.is_waiting;
  this.player_win_id = match.player_win_id;
};

Match.createMatch = (info, result) => {
  sql.query(
    `INSERT INTO matches(player_one_id) VALUES (${info.id})`,
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

Match.findMatch = (info, result) => {
  sql.query(
    `SELECT * FROM matches WHERE player_two_id IS NULL AND is_waiting = true AND player_one_id != ${info.user_id}`,
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

Match.goInMatch = (info, result) => {
  sql.query(
    `UPDATE matches SET player_two_id = ${info.user_id} , is_waiting = false WHERE id = ${info.match_id}`,
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

Match.playAgainstAI = (info, result) => {
  sql.query(
    `INSERT INTO matches(player_one_id, player_two_id,is_waiting, player_win_id) VALUES (${info.user_id},1,false,${info.winner_id})`,
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

Match.setWinner = (info, result) => {
  //player_win_id
  sql.query(
    `UPDATE matches SET player_win_id = ${info.user_id} WHERE id = ${info.match_id}`,
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

Match.getHistory = (info, result) => {
  sql.query(
    `SELECT * FROM matches WHERE (player_one_id = ${info.user_id} or player_two_id = ${info.user_id}) AND is_waiting = 0 AND player_two_id IS NOT NULL AND player_win_id IS NOT NULL`,
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

Match.getMatchInfo = (info, result) => {
  sql.query(`SELECT * FROM matches WHERE id = ${info.id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

module.exports = Match;
