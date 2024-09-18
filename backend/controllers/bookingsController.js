import BookingModel from "../models/bookingModel.js";
import Stripe from "stripe";
import MovieModel from "../models/movieModel.js";
import ShowtimeModel from "../models/showtimeModel.js";
import TheaterModel from "../models/theaterModel.js";
import SeatModel from "../models/seatModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const clientURL = process.env.FRONTEND_URL;

export async function addNewBooking(req, res) {
  const bookingDetails = req.body;
  const booking = new BookingModel(bookingDetails);
  console.log(booking);
  await booking.save();
  res.status(201).json({ message: "Booking created successfully" });
}

export async function getAllBookings(req, res) {
  const bookings = await BookingModel.find();
  res.status(200).json({ bookings: bookings });
}

export async function getBookingById(req, res) {
  const { id } = req.params;
  const booking = await BookingModel.findById(id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  res.status(200).json({ booking: booking });
}

export async function updateBooking(req, res) {
  const { id } = req.params;
  const newData = req.body;
  const booking = await BookingModel.findOneAndUpdate({ _id: id }, newData);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  res.status(200).json({ message: "Booking updated successfully" });
}

export async function deleteBooking(req, res) {
  const { id } = req.params;
  const booking = await BookingModel.findByIdAndDelete(id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  res.status(200).json({ message: "Booking deleted successfully" });
}

export async function paymentSession(req, res) {
  const { showtimeID, movieID, theaterID, totalAmount, selectedSeats } =
    req.body;
  if (!showtimeID || !movieID || !theaterID || !totalAmount || !selectedSeats) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const showtime = await ShowtimeModel.findById(showtimeID);
  const movie = await MovieModel.findById(movieID);
  const theater = await TheaterModel.findById(theaterID);
  const seats = await SeatModel.find({ _id: { $in: selectedSeats } });
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Movie: ${movie.title}`,
            description: `Theater: ${theater.name} | 
            Date: ${new Date(showtime.date).toDateString()} | 
            Time: ${formatTime(showtime.time)} | 
            Seats: ${seats.map((seat) => seat.seatID)}`,
            images: [movie.image],
          },
          unit_amount: totalAmount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${clientURL}/payments/success`,
    cancel_url: `${clientURL}/payments/cancel`,
  });

  res
    .status(200)
    .json({ message: "Payment session created", sessionId: session.id });
}
