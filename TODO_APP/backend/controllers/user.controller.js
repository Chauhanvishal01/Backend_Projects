import { z } from "zod";
import User from "../models/user.model.js";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address!" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 Character" })
    .max(12),
  username: z
    .string()
    .min(3, { message: "Username atleat 3 Character" })
    .max(12),
});

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errormsg = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errormsg });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Registered" });
    }
    const newUser = new User({ email, username, password });
    await newUser.save();
    if (newUser) {
      return res
        .status(201)
        .json({ message: "User Registered Successfully", newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
