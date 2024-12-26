const message = require("../Models/message");

const getMessages = async (req, res, next) => {
  const messages = await message.find().exec();
  if (messages) {
    res.json(messages);
  } else {
    res
      .status(500)
      .json({ error: "Some Error Occured at backend message fetching!" });
  }
};



const sendMessage = async (req, res, next) => {
  const messageData = req.body;

  const newMessage = new message({
    username: messageData.userName,
    message: messageData.message,
  });

  try {
    const result = await newMessage.save();
    const io = require("../socket").getIo();
    io.emit("allMessages", { action: "sent", text: result });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
