import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { logIn, signUp } from "../../controllers/usersControllers.js";

const usersRouter = Router();

usersRouter.post("/signup", asyncHandler(signUp));
usersRouter.post("/login", asyncHandler(logIn));

export default usersRouter;
