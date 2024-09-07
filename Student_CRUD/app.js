import express from "express";
import { connection } from "./db/connection.js";
import studentRouter from "./routes/student.routes.js";
import { config } from "dotenv";
const app = express();

config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/students", studentRouter);

connection();

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
