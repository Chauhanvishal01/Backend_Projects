import express from "express";
import { config } from "dotenv";
import { connection } from "./Database/connection.js";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
config({ path: "./config/config.env" });



app.use(express.json());
//Routes
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);

//Database Connection
connection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
