import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../api/movieSlice";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { data } = useGetMovieByIdQuery(movieId);
  const movie = data?.movie || {};
  if (!movie) {
    return <div className="container mx-auto p-4">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="card bg-base-100 shadow-xl w-1/2">
        <figure>
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Rating: {movie.rating}</p>
          <p>Duration: {movie.duration} minutes</p>
          <p>Genre: {movie.genre}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {movie.trailerUrl ? (
          <div className="w-full h-96">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="text-center p-4">No trailer available</div>
        )}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <h3 className="text-xl font-semibold">Available Showtimes</h3>
            <ul className="space-y-2">
              {movie.showtimes?.map((showtime, index) => (
                <li key={index} className="flex justify-between">
                  <span>{showtime.theaterID.name}</span>
                  <span>{new Date(showtime.date).toDateString()}</span>
                  <span>{showtime.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary w-full lg:w-1/2">
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
