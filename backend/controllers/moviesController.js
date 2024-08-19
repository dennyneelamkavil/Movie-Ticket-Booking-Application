import MovieModel from "../models/movieModel.js";

export async function addNewMovie(req, res) {
    const movieDetails = req.body;
    if(req.file){
        movieDetails.image = req.file.path;
        movieDetails.imagePublicId = req.file.filename;
    }
    const movie = new MovieModel(movieDetails);
    console.log(movie);
    await movie.save();
    res.status(201).json({ message: "Movie created successfully" });
}

export async function getAllMovies(req, res) {
    const movies = await MovieModel.find();
    res.status(200).json({ movies: movies });
}

export async function getMovieById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.findById(id);
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ movie: movie });
}

export async function updateMovie(req, res) {
    const { id } = req.params;
    const newData = req.body;
    if(req.file){
        newData.image = req.file.path;
        newData.imagePublicId = req.file.filename;
    }
    const movie = await MovieModel.findOneAndUpdate(id, newData);
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie updated successfully" });
}

export async function deleteMovie(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
}