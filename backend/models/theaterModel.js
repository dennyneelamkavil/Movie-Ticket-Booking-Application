import mongoose from "mongoose";

const TheaterSchema = new mongoose.Schema(
  {
    theaterID: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    seatingLayout: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatModel",
      },
    ],
    showtimes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShowtimeModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TheaterModel = mongoose.model("Theaters", TheaterSchema);

export default TheaterModel;

// capacity, contactinfo, amenities can be added
