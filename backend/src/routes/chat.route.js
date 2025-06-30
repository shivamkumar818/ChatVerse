import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken, getUnreadStatus } from "../controllers/chat.controller.js";

const router = express.Router();
router.get("/token", protectRoute, getStreamToken);


router.get("/unread-status", protectRoute, getUnreadStatus);

export default router;
