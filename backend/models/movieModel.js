import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    image: String,
    imagePublicId: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
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

const MovieModel = mongoose.model("Movies", MovieSchema);

export default MovieModel;
