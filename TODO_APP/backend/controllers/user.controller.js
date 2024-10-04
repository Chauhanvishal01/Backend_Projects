import { z } from "zod";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";

//Validation
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
      return res.status(400).json({ errors: "All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errormsg = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errormsg });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "User Already Registered" });
    }

    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateToken(newUser._id, res);

      return res
        .status(201)
        .json({ message: "User Registered Successfully", newUser, token });
    }
  } catch (error) {
    return res.status(500).json({ errors: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await generateToken(user._id, res);

    res.status(200).json({ message: "User logged In", user, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
