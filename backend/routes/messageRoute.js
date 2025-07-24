import express from "express";
import Message from "../models/messageModel.js"; 
import isloggedin from "../middelware/isloggedIn.js";
const router = express.Router();

router.get("/:userId1/:userId2", isloggedin, async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const { page = 1, limit = 50 } = req.query;

    if (req.user.userId !== userId1 && req.user.userId !== userId2) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    messages.reverse();

    res.json({
      success: true,
      messages,
      hasMore: messages.length === limit,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export const saveMessage = async (messageData) => {
  try {
    const message = new Message(messageData);
    await message.save();
    return message;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

export default router;
