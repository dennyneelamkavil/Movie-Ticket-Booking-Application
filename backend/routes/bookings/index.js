import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import {
  addNewBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  paymentSession,
  updateBooking,
} from "../../controllers/bookingsController.js";

const bookingsRouter = Router();

bookingsRouter.post("/addnew", verifyToken, asyncHandler(addNewBooking));
bookingsRouter.get("/all", verifyToken, asyncHandler(getAllBookings));
bookingsRouter.get("/:id", verifyToken, asyncHandler(getBookingById));
bookingsRouter.put("/:id", verifyToken, asyncHandler(updateBooking));
bookingsRouter.delete("/:id", verifyToken, asyncHandler(deleteBooking));
bookingsRouter.post("/payment/create-checkout-session", verifyToken, asyncHandler(paymentSession));

export default bookingsRouter;
