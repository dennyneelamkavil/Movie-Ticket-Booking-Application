import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../api/movieSlice";
import { useEffect, useState } from "react";
import formatTime from "../utils/formatTime";

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, refetch } = useGetMovieByIdQuery(movieId);
  const movie = data?.movie || {};

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!movie) {
    return <div className="container mx-auto p-4">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="card bg-base-100 shadow-xl w-1/2">
        <figure>
          <img
            src={movie?.image}
            alt={movie?.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie?.title}</h2>
          <p className={`${isExpanded ? "" : "line-clamp-6"}`}>
            {movie?.description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 mt-2 underline text-sm"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {movie?.trailerUrl ? (
          <div className="w-full h-96">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
              title={`${movie?.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="text-center p-4">No trailer available</div>
        )}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div className="flex justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Duration: </h2>
                <p>{movie?.duration} minutes</p>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Genre: </h2>
                <p>{movie?.genre}</p>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Rating: </h2>
                <p>{movie?.rating}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-5">Available Showtimes</h3>
            <ul className="space-y-2">
              {movie?.showtimes?.map((showtime) => (
                <li key={showtime?._id} className="flex justify-between">
                  <span>{showtime?.theaterID?.name}</span>
                  <span>{new Date(showtime?.date).toDateString()}</span>
                  <span>{formatTime(showtime?.time)}</span>
                  <button
                    className="btn btn-sm"
                    onClick={() => navigate(`/movies/book/${showtime._id}`)}
                  >
                    Book
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
