const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { db } = require("./util/database");
const { router } = require("./Routes/ChatRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

db().then(() => {
  const server = app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
  const io = require("./socket").init(server, {
    cors: {
      origin: process.env.REQ_ORIGIN,
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Client Connected!", socket.id);
  });
});
