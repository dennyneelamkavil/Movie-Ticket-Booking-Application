import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    theaterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theaters",
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    seatType: {
      type: String,
      enum: ["Standard", "Premium"],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

SeatSchema.index({ theaterID: 1, seatNumber: 1 }, { unique: true });

const SeatModel = mongoose.model("Seats", SeatSchema);

export default SeatModel;
