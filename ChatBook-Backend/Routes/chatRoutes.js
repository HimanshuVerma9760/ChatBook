const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require("../Controller/messagesController");
const { addNewUser } = require("../Controller/addUserController");
const { body, validationResult } = require("express-validator");
const { userLogin } = require("../Controller/userLoginController");
const Auth = require("../util/Auth");

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

router.post(
  "/user-login",
  [
    body("userEmail").trim().escape().notEmpty().withMessage("Invalid Entry!"),
    body("userPassword")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Invalid Entry!"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      return res.status(500).json({ message: errors[0].msg });
    }
  },
  userLogin
);

router.use(Auth);

router.get("/dashboard", (req, res, next) => {
  res.status(200).json({ message: "You Are In!" });
});
router.get("/chats", getMessages);
router.post("/chats", sendMessage);

exports.router = router;
