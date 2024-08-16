import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteUser, getAllUsers, getUserById, logIn, signUp, updateUser } from "../../controllers/usersControllers.js";
import { isAdmin } from "../../utils/authMiddleware.js";

const usersRouter = Router();
// Regular User
usersRouter.post("/signup", asyncHandler(signUp));
usersRouter.post("/login", asyncHandler(logIn));
usersRouter.get("/all", asyncHandler(getAllUsers));
usersRouter.get("/:id", asyncHandler(getUserById));
usersRouter.put("/:id", asyncHandler(updateUser));
usersRouter.delete("/:id", asyncHandler(deleteUser));

// Admin


export default usersRouter;
