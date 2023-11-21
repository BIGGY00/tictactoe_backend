class socketConnection {
  constructor(conn) {
    this.id = conn.id;
    this.socket = conn.socket;
    this.user_id = null;
  }
}

module.exports = socketConnection;
