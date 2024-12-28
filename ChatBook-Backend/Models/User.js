const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3, 
      maxlength: 10,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3, 
    },
    userPassword: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
