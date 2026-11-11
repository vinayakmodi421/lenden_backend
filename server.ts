import type {
  NextFunction,
  ErrorRequestHandler,
} from "express";
import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/AuthRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config();
import { connectDatabase } from "./db.js";
import chatRouter from "./routers/ChatRouter.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
await connectDatabase();
import morgan from "morgan";
import notificationRouters from "./routers/Notifications.js";
import expensesRouter from "./routers/ExpensesRouter.js";
import { initializeSocket } from "./socket/Index.js";
import msgRouter from "./routers/MessagesRouter.js";
import { producer } from "./kafka.js";
await producer.connect();

const redisClient = createClient({
  url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

await redisClient.connect();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(cookieParser());

app.use(cors({
  origin : ["http://localhost:5173","http://192.168.1.5:5173"],
  credentials : true,
}));
app.use(express.json());
app.use("/api",authRouter)
app.use("/api",chatRouter)
app.use("/api",notificationRouters)
app.use("/api" ,expensesRouter)
app.use("/api" ,msgRouter)

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server connected successfully",
  });
});

const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  
  res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
app.use(errorHandler);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials : true,
  },
  //  transports: ["websocket"],
  pingInterval: 5000, // send ping every 25 sec
  pingTimeout: 5000 // wait 20 sec for pong
});

initializeSocket(io , redisClient);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
