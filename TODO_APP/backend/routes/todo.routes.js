import express from "express";
import { createTodo, getTodos } from "../controllers/todo.controller.js";

const router = express.Router();


router.post("/create",createTodo)
router.get("/get",getTodos)
export default router;
