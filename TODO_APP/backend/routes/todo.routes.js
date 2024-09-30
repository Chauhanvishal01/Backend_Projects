import express from "express";
import { createTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();


router.post("/create",createTodo)
router.get("/get",getTodos)
router.put("/update/:id",updateTodo)
export default router;
