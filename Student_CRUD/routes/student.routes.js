import express from "express";
import { deleteStudent, getAllStudents, registerStudent, updateStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/register", registerStudent);
router.get("/getAll", getAllStudents);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id",deleteStudent)

export default router;
