import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useAddNewMovieMutation,
  useUpdateMovieMutation,
  useGetMovieByIdQuery,
} from "../api/movieSlice";
import { toast } from "react-toastify";
export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, refetch } = useGetMovieByIdQuery(id, {
    skip: !isEditMode,
  });

  const [updateMovie] = useUpdateMovieMutation();
  const [addNewMovie] = useAddNewMovieMutation();

  useEffect(() => {
    if (isEditMode && data?.movie) {
      const movie = data.movie;
      setValue("title", movie.title || "");
      setValue("description", movie.description || "");
      setValue("duration", movie.duration || "");
      setValue("genre", movie.genre.join(", ") || "");
      setImagePreview(movie.image || null);
    }
  }, [data, isEditMode, setValue]);

  const onSubmit = async (formData) => {
    try {
      const { title, description, duration, genre, image } = formData;
      const moviePayload = {
        title,
        description,
        duration: Number(duration),
        genre: genre.split(",").map((g) => g.trim()),
        poster: image,
      };

      let res;
      if (isEditMode) {
        res = await updateMovie({
          id,
          updatedMovie: moviePayload,
        }).unwrap();
        refetch();
      } else {
        res = await addNewMovie(moviePayload).unwrap();
      }

      navigate("/dashboard/movies");
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 pb-10 max-w-5xl">
      <div className="flex space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="bg-white p-3 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Movie" : "Add Movie"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (in minutes)
                  </label>
                  <input
                    type="text"
                    {...register("duration", {
                      required: "Duration is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Genre (comma separated)
                  </label>
                  <input
                    type="text"
                    {...register("genre", { required: "Genre is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.genre && (
                    <p className="text-red-500 text-sm">
                      {errors.genre.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    {...register("image", {
                      required: !isEditMode && "Image is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    onChange={handleImageChange}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Preview
                  </label>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-16 object-cover border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No file selected</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/movies")}
                  className="bg-red-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  {isEditMode ? "Update Movie" : "Add Movie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
