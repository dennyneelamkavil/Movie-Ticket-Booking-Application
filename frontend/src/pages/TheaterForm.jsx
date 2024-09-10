import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useAddNewTheaterMutation,
  useUpdateTheaterMutation,
  useGetTheaterByIdQuery,
} from "../api/theaterSlice";
import { toast } from "react-toastify";
export default function TheaterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, refetch } = useGetTheaterByIdQuery(id, {
    skip: !isEditMode,
  });

  const [updateTheater] = useUpdateTheaterMutation();
  const [addNewTheater] = useAddNewTheaterMutation();

  useEffect(() => {
    if (isEditMode && data?.theater) {
      const theater = data.theater;
      setValue("name", theater.name || "");
      setValue("location", theater.location || "");
      setValue("showtimes", theater.showtimes || "");
    }
  }, [data, isEditMode, setValue]);

  const onSubmit = async (formData) => {
    try {
      const { name, location, showtimes } = formData;
      const theaterPayload = {
        name,
        location,
        showtimes,
      };

      let res;
      if (isEditMode) {
        res = await updateTheater({
          id,
          updatedTheater: theaterPayload,
        }).unwrap();
        refetch();
      } else {
        res = await addNewTheater(theaterPayload).unwrap();
      }

      navigate("/dashboard/theaters");
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 pb-10 max-w-5xl">
      <div className="flex space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="bg-white p-3 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Theater" : "Add Theater"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Showtimes
                  </label>
                  <input
                    type="text"
                    {...register("showtimes", {
                      required: "Showtimes is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.showtimes && (
                    <p className="text-red-500 text-sm">
                      {errors.showtimes.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/theaters")}
                  className="bg-red-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  {isEditMode ? "Update Theater" : "Add Theater"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
