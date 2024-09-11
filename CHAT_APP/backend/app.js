import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connection } from "./Database/Connection.js";
const app = express();
config({ path: "./config/config.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB connection
connection();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
