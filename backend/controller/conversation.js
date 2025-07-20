const ConversationModal = require('../models/conversation');
const MessageModel = require('../models/message');

exports.addConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, message } = req.body;

    if (!receiverId || !message || message.trim() === '') {
      return res.status(400).json({ error: "Receiver ID and message are required." });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ error: "Sender and receiver cannot be the same." });
    }

    let conversation = await ConversationModal.findOne({
      members: { $all: [senderId, receiverId], $size: 2 }
    });

    if (!conversation) {
      conversation = new ConversationModal({
        members: [senderId, receiverId]
      });
      await conversation.save();
    }

    const newMessage = new MessageModel({
      sender: senderId,
      conversation: conversation._id,
      message
    });

    await newMessage.save();

    return res.status(201).json({
      message: "Message sent successfully",
      conversationId: conversation._id
    });

  } catch (error) {
    console.error("Error in addConversation:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await ConversationModal.find({
      members: { $in: [userId] }
    })
      .populate("members", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      message: "Fetched successfully",
      conversations
    });

  } catch (error) {
    console.error("Error in getConversation:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
