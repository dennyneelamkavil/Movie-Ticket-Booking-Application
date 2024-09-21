import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import { deleteRequest, deleteUser, getAllRequests, getAllUsers, getTheaterOwners, getUserById, logIn, requestVerification, signUp, updateUser, verifyUser } from "../../controllers/usersControllers.js";

const usersRouter = Router();

usersRouter.post("/signup", asyncHandler(signUp));
usersRouter.post("/login", asyncHandler(logIn));
usersRouter.get("/theaterOwnerlist", verifyToken, asyncHandler(getTheaterOwners));
usersRouter.get("/all", verifyToken, checkAuth("admin"), asyncHandler(getAllUsers));
usersRouter.get("/requests", verifyToken, asyncHandler(getAllRequests));
usersRouter.get("/:id", verifyToken, asyncHandler(getUserById));
usersRouter.put("/verify/:id", verifyToken, asyncHandler(verifyUser));
usersRouter.put("/:id", verifyToken, asyncHandler(updateUser));
usersRouter.delete("/requests/:id", verifyToken, asyncHandler(deleteRequest));
usersRouter.delete("/:id", verifyToken, asyncHandler(deleteUser));
usersRouter.post("/requestverification", verifyToken, asyncHandler(requestVerification));

export default usersRouter;
