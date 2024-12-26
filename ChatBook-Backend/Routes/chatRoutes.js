const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require("../Controller/messagesController");

router.get("/", getMessages);

router.post("/", sendMessage);

exports.router = router;
