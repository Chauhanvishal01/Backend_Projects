import express from "express";
import { config } from "dotenv";
import cookieParser from 'cookie-parser'
import cors from "cors";
import { connection } from "./Database/connection.js";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
config({ path: "./config/config.env" });

app.use(express.json());
app.use(cookieParser()); 
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//Routes
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);

//Database Connection
connection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
