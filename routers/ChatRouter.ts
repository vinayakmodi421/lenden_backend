import express from "express"
import { authenticate } from "../middlewares/auth.js";
import { createGroup, deactivateGroup, exitGroupMember, fetchAllMessages, fetchGroups, modifyGroup, requestToJoin, searchUser } from "../controllers/ChatController.js";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const chatRouter = express.Router();

chatRouter.get("/search" , authenticate , searchUser);

chatRouter.post("/group" , authenticate , upload.none(), createGroup );

chatRouter.put("/group" , authenticate , modifyGroup);

chatRouter.put("/deactivate-group" , authenticate , deactivateGroup);

chatRouter.get('/group/:id' , authenticate , fetchGroups);

chatRouter.post("/request" , authenticate , requestToJoin);


chatRouter.get('/message/:id' , authenticate , fetchAllMessages);

chatRouter.post('/exitMember/:id' , authenticate , exitGroupMember)



export default chatRouter