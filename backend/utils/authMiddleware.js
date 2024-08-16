import UserModel from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  const userDetails = req.body;
  const user = await UserModel.findOne({ email: userDetails.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const isOwner = async (req, res, next) => {
  const userDetails = req.body;
  const user = await UserModel.findOne({ email: userDetails.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.role !== "theaterOwner") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
