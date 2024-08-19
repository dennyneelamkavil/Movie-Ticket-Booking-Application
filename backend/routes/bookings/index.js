import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import {
  addNewBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "../../controllers/bookingsController.js";

const bookingsRouter = Router();

bookingsRouter.post("/addnew", verifyToken, checkAuth("theaterOwner"), asyncHandler(addNewBooking));
bookingsRouter.get("/all", verifyToken, asyncHandler(getAllBookings));
bookingsRouter.get("/:id", verifyToken, asyncHandler(getBookingById));
bookingsRouter.put("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(updateBooking));
bookingsRouter.delete("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(deleteBooking));

export default bookingsRouter;
