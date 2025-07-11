import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  const token = generateToken(user._id);
  res.status(201).json({ token, role: user.role });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);
  res.json({ token, role: user.role });
  return res.json({ Success: "True" }); // Note: This line is unreachable and redundant
};
