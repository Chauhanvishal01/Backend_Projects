import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ errors: "Unauthorized Access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    return res.status(401).json({ errors: error.message });
  }
  next();
};
