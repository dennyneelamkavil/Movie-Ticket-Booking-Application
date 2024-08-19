import BookingModel from "../models/bookingModel.js";

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
    const booking = await BookingModel.findOneAndUpdate(id, newData);
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