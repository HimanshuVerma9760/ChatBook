const mongoose = require("mongoose");

const db = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Succesfuly connected to DB!");
    })
    .catch((err) => {
      console.log("An error occured while connecting to DB!", err);
    });

exports.db = db;
