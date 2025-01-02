const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let encryptedToken;

  try {
    encryptedToken = req.headers.authorization.split(" ")[1];
  } catch (error) {
    console.log("error in header for token!");
    return res.status(400).json({ message: "Invalid token format in header!" });
  }

  if (!encryptedToken) {
    console.log("No token!");
    return res
      .status(401)
      .json({ message: "Authentication failed! Token missing." });
  }

  try {
    if (!process.env.MySecretKey) {
      console.log("No secrect key!");
      return res
        .status(500)
        .json({ message: "Server configuration error: Missing secret key!" });
    }

    const decodedToken = jwt.verify(encryptedToken, process.env.MySecretKey);
    req.id = decodedToken.id;
    console.log("Token verified successfully");
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};
