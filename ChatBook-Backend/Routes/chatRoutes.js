const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require("../Controller/messagesController");
const { addNewUser } = require("../Controller/addUserController");

router.get("/", getMessages);

router.post("/", sendMessage);
router.post("/add-new-user", addNewUser);

exports.router = router;
