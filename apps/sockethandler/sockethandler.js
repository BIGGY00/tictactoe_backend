const socketConnection = require("./socket_connection");

var socketConnections = [];

const connectionInit = (ws) => {
  const soc = new socketConnection({
    id: socketConnections.length + 1,
    socket: ws,
  });
  onListen(soc);
  socketConnections.push(soc);
};

const onListen = (s) => {
  s.socket.on("message", (message) => {
    const msg = JSON.parse(Buffer.from(message).toString());
    doMessage(s, msg);
  });
};

const sendToId = (id, msg) => {
  var soc = socketConnections.find((a) => a.user_id == id);
  if (soc != null) {
    console.log(soc);
    soc.socket.send(JSON.stringify(msg));
  }
};

const doMessage = (s, message) => {
  console.log(message);
  /* HandShake command! */
  if (message.cmd == "handshake") {
    socketConnections = socketConnections.filter(
      (a) => a.user_id != message.user_id
    );
    s.user_id = message.user_id;
    console.log(`Socket id: ${s.id} regis as u_id: ${message.user_id}`);
    /* Join Command */
  } else if (message.cmd == "join") {
    sendToId(message.owner_id, message);
    console.log(
      `User ${message.joiner_id} is joining User ${message.owner_id}`
    );
  } else if (message.cmd == "move") {
    sendToId(message.to_id, message);
    console.log(`User is sending move to ${message.to_id}`);
  } else if (message.cmd == "end") {
    sendToId(message.to_id, message);
    console.log(`Match ended to ${message.to_id}`);
  }
};

module.exports = {
  connectionInit,
  sendToId,
};
