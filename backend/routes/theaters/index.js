import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import {
  addNewTheater,
  deleteTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
} from "../../controllers/theatersController.js";

const theatersRouter = Router();

theatersRouter.post("/addnew", verifyToken, checkAuth("theaterOwner"), asyncHandler(addNewTheater));
theatersRouter.get("/all", verifyToken, asyncHandler(getAllTheaters));
theatersRouter.get("/:id", verifyToken, asyncHandler(getTheaterById));
theatersRouter.put("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(updateTheater));
theatersRouter.delete("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(deleteTheater));

export default theatersRouter;
