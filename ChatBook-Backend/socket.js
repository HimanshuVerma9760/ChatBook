let io;

module.exports = {
  init: (server, config) => (io = require("socket.io")(server, config)),
  getIo: () => {
    if (!io) {
      return;
    } else {
      return io;
    }
  },
};
