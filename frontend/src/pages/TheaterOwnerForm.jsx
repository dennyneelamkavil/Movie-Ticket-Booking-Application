import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useGetUserByIdQuery,
  useSignupMutation,
  useUpdateUserMutation,
} from "../api/userApiSlice";
import { toast } from "react-toastify";

export default function TheaterOwnerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);
  const { data, refetch } = useGetUserByIdQuery(id, {
    skip: !isEditMode,
  });
  //   const theaterOwner = data?.user || {};
  const theaterOwner = useMemo(() => data?.user || {}, [data]);

  const [name, setName] = useState(theaterOwner.name || "");
  const [phone, setPhone] = useState(theaterOwner.phone || "");
  const [email, setEmail] = useState(theaterOwner.email || "");
  const [lastLoggedIn] = useState(
    theaterOwner.lastLoggedIn
      ? new Date(theaterOwner.lastLoggedIn).toLocaleString()
      : ""
  );
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(
    theaterOwner.isVerified ? "Verified" : "Not Verified"
  );
  const [city, setCity] = useState(theaterOwner.city || "");

  const [editUser] = useUpdateUserMutation();
  const [addUser] = useSignupMutation();

  useEffect(() => {
    if (isEditMode && data) {
      setName(theaterOwner.name || "");
      setPhone(theaterOwner.phone || "");
      setEmail(theaterOwner.email || "");
      setStatus(theaterOwner.isVerified ? "Verified" : "Not Verified");
      setCity(theaterOwner.city || "");
      setPassword("");
    }
  }, [data, isEditMode, theaterOwner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isVerified = status === "Verified";
      const userPayload = { name, phone, email, isVerified, city };
      let res;
      if (isEditMode) {
        res = await editUser({ id, updatedUser: userPayload }).unwrap();
        refetch();
      } else {
        res = await addUser(userPayload).unwrap();
      }
      navigate("/dashboard/theaterOwnersList");
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
                {isEditMode ? "Edit Theater Owner" : "Add Theater Owner"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                {isEditMode ? (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Logged In
                    </label>
                    <input
                      type="text"
                      name="lastLoggedIn"
                      value={lastLoggedIn}
                      readOnly
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Status
                  </label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Not Verified">Not Verified</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/theaterOwnersList")}
                  className="bg-red-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  {isEditMode ? "Update Theater Owner" : "Add Theater Owner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
