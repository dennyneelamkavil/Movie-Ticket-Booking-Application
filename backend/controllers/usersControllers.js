import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";

export async function signUp(req, res) {
  const userDetails = req.body;
  userDetails.password = await bcrypt.hash(userDetails.password, 10);
  const user = new UserModel(userDetails);
  console.log(user);
  await user.save();
  res.status(201).json({ message: "User created successfully" });
}

export async function logIn(req, res) {
  const loginDetails = req.body;
  const user = await UserModel.findOne({ email: loginDetails.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!(await bcrypt.compare(loginDetails.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user.name, user.email, user.role);
  res.status(200).json({ token: token, message: "Login successful" });
}


