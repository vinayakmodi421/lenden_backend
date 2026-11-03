
import express from "express"
import { authenticate } from "../middlewares/auth.js";
import { fetchAllMessages } from "../controllers/MessageController.js";

const msgRouter = express.Router();
msgRouter.get('/message/:id' , authenticate , fetchAllMessages);


export default msgRouter