const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require("../Controller/messagesController");
const { addNewUser } = require("../Controller/addUserController");
const { body, validationResult } = require("express-validator");

router.get("/", getMessages);

router.post("/", sendMessage);
router.post(
  "/add-new-user",
  [
    body("fullName")
      .trim()
      .notEmpty()
      .escape()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Only alphabets and spaces are allowed!"),
    body("userEmail")
      .trim()
      .notEmpty()
      .escape()
      .isEmail()
      .withMessage("Invalid Email!"),
    body("userPassword")
      .trim()
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password is Malicious"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      console.log(errors.array());
      return res.status(202).json({ message: errors.array()[0].msg });
    }
  },
  addNewUser
);

exports.router = router;
