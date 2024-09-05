import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";

export async function signUp(req, res) {
  const userDetails = req.body;
  userDetails.password = await bcrypt.hash(userDetails.password, 10);
  const user = new UserModel(userDetails);
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
  res
    .status(200)
    .json({ user: user, token: token, message: "Login successful" });
}

export async function getAllUsers(req, res) {
  const users = await UserModel.find();
  res.status(200).json({ users: users });
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user: user });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const newData = req.body;
  const user = await UserModel.findOneAndUpdate({ _id: id }, newData);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User updated successfully" });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
}
