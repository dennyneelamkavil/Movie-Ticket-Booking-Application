import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "theaterOwner"],
      default: "user",
    },
    bookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
