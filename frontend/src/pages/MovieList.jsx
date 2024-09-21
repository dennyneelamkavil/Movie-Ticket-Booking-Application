import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useGetAllMoviesQuery,
  useDeleteMovieMutation,
} from "../api/movieSlice";
import { toast } from "react-toastify";

export default function MovieList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllMoviesQuery();
  const movies = data.movies || [];

  const [deleteMovie] = useDeleteMovieMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteMovie(id).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
        return;
      }
      toast.error(error.data.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-gray-100 min-h-screen mt-[65px] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Movies</h2>
          {(user.role === "admin" || user.isVerified) && (
            <button
              onClick={() => navigate("/dashboard/movies/add")}
              className="bg-primary text-white hover:bg-indigo rounded-lg px-6 py-2"
            >
              + Add New
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Filter</h3>
          <hr className="mb-4" />
          <div>
            <label
              htmlFor="movie-search"
              className="font-medium text-gray-700 mb-2 block"
            >
              Search:
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <input
                type="text"
                id="movie-search"
                className="border border-gray-300 rounded-lg p-2 flex-grow sm:flex-grow-0 sm:w-48 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 p-3 text-left">No</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 p-3 text-left w-2/6">
                    Description
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Duration
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Genre
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Image
                  </th>
                  {/* <th className="border border-gray-300 p-3 text-left">
                    Rating
                  </th> */}
                  <th className="border border-gray-300 p-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="4" className="text-center text-red">
                      {error?.message}
                    </td>
                  </tr>
                ) : (
                  movies.map((movie, index) => (
                    <tr key={movie._id} className="border-b border-gray-300">
                      <td className="border border-gray-300 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {movie.title}
                      </td>
                      <td className="p-3 pb-0 line-clamp-4">
                        {movie.description}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {movie.duration}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {movie.genre}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <img src={movie.image} alt={movie.title} width={50} />
                      </td>
                      {/* <td className="border border-gray-300 p-3">
                        {movie.rating}
                      </td> */}
                      <td className="border border-gray-300 p-3">
                        <div className="flex justify-center items-center">
                          {user.role === "admin" || user.isVerified ? (
                            <div className="flex gap-4">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/dashboard/movies/edit/${movie._id}`
                                  )
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(movie._id)}
                                className="bg-red-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded flex items-center"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          ) : (
                            <p className="text-gray-500 mt-2 text-center">
                              Contact admin for more actions.
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mb-24"></div>
    </div>
  );
}
