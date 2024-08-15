import mongoose from "mongoose";

const ShowtimeSchema = new mongoose.Schema(
  {
    showtimeID: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    movieID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovieModel",
      required: true,
    },
    theaterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TheaterModel",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

ShowtimeSchema.index({ movieID: 1, date: 1, time: 1 }, { unique: true });

const ShowtimeModel = mongoose.model("Showtimes", ShowtimeSchema);

export default ShowtimeModel;
