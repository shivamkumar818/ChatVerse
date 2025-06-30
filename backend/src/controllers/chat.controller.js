import { generateStreamToken } from "../lib/stream.js";
import mongoose from "mongoose";
import Message from "../models/Message.js"; 

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUnreadStatus(req, res) {
  try {
    const userId = req.user.id;

    const unreadMessages = await Message.aggregate([
      {
        $match: {
          receiver: new mongoose.Types.ObjectId(userId),
          read: false
        }
      },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(unreadMessages);
  } catch (error) {
    console.error("Error in getUnreadStatus controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
