const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  let user;
  try {
    user = await UserModel.findOne({ email: userEmail });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Some Error Occured! Try again later!" });
  }
  if (user) {
    const decodedPassword = await bcrypt.compare(
      userPassword,
      user.userPassword
    );
    if (decodedPassword) {
      try {
        if (!process.env.MySecretKey) {
          return res
            .status(500)
            .json({
              message: "Server configuration error: Missing secret key!",
            });
        }

        const token = jwt.sign(
          {
            id: user.id,
            name: user.username,
            email: user.email,
          },
          process.env.MySecretKey,
          { expiresIn: "1h" }
        );

        return res.status(200).json({ token, message: "Successful Login!" });
      } catch (error) {
        console.error("JWT Error:", error);
        return res.status(500).json({ message: "JWT generation error!" });
      }
    } else {
      return res.status(500).json({ message: "Invalid Credentials!" });
    }
  } else {
    return res.status(500).json({ message: "Invalid Credentials!" });
  }
};

exports.userLogin = userLogin;
