import ShowtimeModel from "../models/showtimeModel.js";

export async function addNewShowtime(req, res) {
    const showtimeDetails = req.body;
    const showtime = new ShowtimeModel(showtimeDetails);
    console.log(showtime);
    await showtime.save();
    res.status(201).json({ message: "Showtime created successfully" });
}

export async function getAllShowtimes(req, res) {
    const showtimes = await ShowtimeModel.find();
    res.status(200).json({ showtimes: showtimes });
}

export async function getShowtimeById(req, res) {
    const { id } = req.params;
    const showtime = await ShowtimeModel.findById(id);
    if (!showtime) {
        return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json({ showtime: showtime });
}

export async function updateShowtime(req, res) {
    const { id } = req.params;
    const newData = req.body;
    const showtime = await ShowtimeModel.findOneAndUpdate(id, newData);
    if (!showtime) {
        return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json({ message: "Showtime updated successfully" });
}

export async function deleteShowtime(req, res) {
    const { id } = req.params;
    const showtime = await ShowtimeModel.findByIdAndDelete(id);
    if (!showtime) {
        return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json({ message: "Showtime deleted successfully" });
}