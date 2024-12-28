const UserModel = require("../Models/User");
const bcrypt = require("bcryptjs");

function generateUsername(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    username += chars[randomIndex];
  }

  return username;
}

const addNewUser = async (req, res, next) => {
  const { fullName, userEmail, userPassword } = req.body;
  let user, encryptedPassword;
  user = await UserModel.findOne({ email: userEmail });
  if (user) {
    return res
      .status(202)
      .json({ message: "User Email Already Exist! Kindly Login!" });
  }
  let userName = generateUsername();
  try {
    while (true) {
      user = await UserModel.findOne({ username: userName });
      if (user) {
        userName = generateUsername();
      } else {
        break;
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error at backend, please try again!" });
  }
  try {
    encryptedPassword = await bcrypt.hash(userPassword, 10);
  } catch (error) {
    return res.status(500).json({ message: "Error while hashing password!" });
  }
  user = new UserModel({
    fullName: fullName,
    username: userName,
    email: userEmail,
    userPassword: encryptedPassword,
  });

  const result = await user.save();
  return res
    .status(200)
    .json({ result, message: "Successfully Added! Kindly Login Now!" });
};
exports.addNewUser = addNewUser;
