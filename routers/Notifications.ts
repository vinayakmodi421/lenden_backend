import express from "express"
import { authenticate } from "../middlewares/auth.js"
import { fetchNotifications } from "../controllers/NotificationController.js";

const notificationRouters = express.Router()

notificationRouters.get('/notifications/:id' , authenticate , fetchNotifications);

export default notificationRouters