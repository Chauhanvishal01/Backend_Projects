import express from "express";
import { config } from "dotenv";
import { connection } from "./Database/connection.js";

const app = express();
config({ path: "./config/config.env" });

//Database Connection
connection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
