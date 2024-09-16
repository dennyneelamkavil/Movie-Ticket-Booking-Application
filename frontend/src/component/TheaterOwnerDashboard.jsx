import { FaUsers, FaAd, FaInfoCircle } from "react-icons/fa";
import Cards from "../ui/Cards.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import useCheckUserStatus from "../utils/useCheckUserStatus";

export default function TheaterOwnerDashboard() {
  //   useCheckUserStatus();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const items = [
    {
      icon: <FaUsers />,
      title: "Theaters",
      style: "bg-blue-500",
      path: "/dashboard/theaters",
    },
    {
      icon: <FaInfoCircle />,
      title: "Movies",
      style: "bg-teal-500",
      path: "/dashboard/movies",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-20 px-4 lg:px-16">
      <div className="container mx-auto flex-grow">
        <div className="p-2">
          <div>
            <p className="text-gray-500 font-medium text-xs">OVERVIEW</p>
            <h1 className="m-0 text-lg leading-snug font-semibold text-inherit flex items-center">
              Dashboard
            </h1>
          </div>
          <div className="flex justify-center items-center mt-2">
            <h1 className="font-medium text-lg text-center">
              Hi{" "}
              <span className="text-red text-xl font-bold">
                {user.userName},
              </span>{" "}
              Welcome to MoviePass
            </h1>
          </div>
        </div>
        <hr className="w-full border-gray-300 my-6" />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3 md:mx-0">
          {items.length > 0 ? (
            items.map((card, index) => (
              <Cards
                key={index}
                title={card.title}
                icon={card.icon}
                style={card.style}
                handleNavigate={() => handleCardClick(card.path)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No available items to display.
            </p>
          )}
        </div>
      </div>
      <div className="mb-24"></div>
    </div>
  );
}
