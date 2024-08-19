import TheaterModel from "../models/theaterModel.js";

export async function addNewTheater(req, res) {
    const theaterDetails = req.body;
    const theater = new TheaterModel(theaterDetails);
    console.log(theater);
    await theater.save();
    res.status(201).json({ message: "Theater created successfully" });
}

export async function getAllTheaters(req, res) {
    const theaters = await TheaterModel.find();
    res.status(200).json({ theaters: theaters });
}

export async function getTheaterById(req, res) {
    const { id } = req.params;
    const theater = await TheaterModel.findById(id);
    if (!theater) {
        return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json({ theater: theater });
}

export async function updateTheater(req, res) {
    const { id } = req.params;
    const newData = req.body;
    const theater = await TheaterModel.findOneAndUpdate({ _id: id }, newData);
    if (!theater) {
        return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json({ message: "Theater updated successfully" });
}

export async function deleteTheater(req, res) {
    const { id } = req.params;
    const theater = await TheaterModel.findByIdAndDelete(id);
    if (!theater) {
        return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json({ message: "Theater deleted successfully" });
}