import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    showtimeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowtimeModel",
      required: true,
    },
    seatID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatModel",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Bookings", BookingSchema);

export default BookingModel;
